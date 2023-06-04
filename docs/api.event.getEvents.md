# GET /api/event/getEvents

Gets the events, provided an array of event ids

## Parameters

```json
{
  "ids": ["string"]
}
```

## Validation

- `ids` must be:

  - an array of strings

## Response

### 200 OK

```json
[
  {
    "id": "string",
    "image": "string",
    "name": "string",
    "description": "string",
    "startTimestamp": "number",
    "endTimestamp": "number",
    "location": "string",
    "zipCode": "string",
    "author": "string",
    "tags": ["string"],
    "attendees": "number"
  }
]
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
