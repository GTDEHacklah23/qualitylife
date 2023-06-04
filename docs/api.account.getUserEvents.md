# GET /api/account/getUserEvents

Gets the events for a user

## Parameters

none

## Validation

none

## Response

### 200 OK

```json
{
  "created": [
    {
      "id": "...",
      "time": "..."
    }
  ],
  "joined": [
    {
      "id": "...",
      "time": "..."
    }
  ]
}
```

### 400 Bad Request

Invalid parameters

```json
{
  "error": "400 - Bad Request"
}
```

### 401 Unauthorized

Missing valid session token

```json
{
  "error": "401 - Unauthorized"
}
```

### 404 Not Found

Cannot find user

```json
{
  "error": "404 - Not Found"
}
```
