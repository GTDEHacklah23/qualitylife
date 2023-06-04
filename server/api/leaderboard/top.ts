import Joi from "joi";
import { handler } from "../handler";
import { UserProfile } from "../../schema/UserProfile";

const schema = Joi.object({});

interface SanitizedUser {
  username: string;
  points: number;
  displayName: string;
}

/**
 * Gets all of the users sorted by their points
 * Do not call this function often, it is very slow
 * @returns a list of users sorted by their points
 */
async function getUsersByPoints(): Promise<SanitizedUser[]> {
  //get all of the users
  const users = await UserProfile.find({}).sort({ points: -1 }).exec();

  return users.map((user) => {
    return {
      username: user.username!,
      points: user.points!,
      displayName: user.displayName!,
    };
  });
}

let cachedLeaderboard: SanitizedUser[] | null = null;
let lastFetched = 0;

export default handler(schema, async (req, res) => {
  //has it been more than 5 minutes since we last fetched the leaderboard?
  const fiveMinutes = 5 * 60 * 1000;
  if (Date.now() - lastFetched > fiveMinutes) {
    //if so, fetch the leaderboard
    cachedLeaderboard = await getUsersByPoints();
    lastFetched = Date.now();
  }

  //check if we have a username in the session
  const username = req.session!.username;
  let userIndex = -1;
  if (username) {
    //find the user in the leaderboard
    userIndex = cachedLeaderboard!.findIndex((user) => {
      return user.username === username;
    });
  }

  //return the leaderboard
  res.json({
    leaderboard: cachedLeaderboard?.slice(0, 10),
    userPosition: userIndex === -1 ? null : userIndex + 1,
    lastUpdated: lastFetched,
  });
});
