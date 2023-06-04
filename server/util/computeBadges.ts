interface UserProfile {
  username: string;
  biography: string;
  displayName: string;
  badges: string[];
  points: number;
  eventsHosted: number;
  eventsAttended: number;
  totalHours: number;
}

export function computeBadges(profile: UserProfile): string[] {
  const badges: string[] = [];

  //first event
  if (profile.eventsAttended >= 1) {
    badges.push("firstEvent");
  }

  //10 events
  if (profile.eventsAttended >= 10) {
    badges.push("10Events");
  }

  //first hosted
  if (profile.eventsHosted >= 1) {
    badges.push("firstHosted");
  }

  //10 hosted
  if (profile.eventsHosted >= 10) {
    badges.push("10Hosted");
  }

  //100 hours spent
  if (profile.totalHours >= 100) {
    badges.push("100Hours");
  }

  return badges;
}
