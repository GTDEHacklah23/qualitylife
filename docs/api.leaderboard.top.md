# GET /api/leaderboard/top

Gets the top 10 players, as well as the current user's rank, if provided a valid session token. Results are cached for 5 minutes.

## Parameters

none

## Validation

none

## Response

### 200 OK

```json
{
  "leaderboard": [
    {
      "username": "...",
      "points": 0,
      "displayName": "..."
    }
  ],
  "userPosition": "null | number",
  "lastUpdated": "number"
}
```
