# POST /api/event/new

Create a new event

## Parameters

```json
{
  "image": "string",
  "name": "string",
  "description": "string",
  "startTimestamp": "number",
  "endTimestamp": "number",
  "location": "string",
  "zipCode": "number",
  "tags": ["string"]
}
```

## Validation

- `image` must be:

  - a string

- `name` must be:

  - a string
  - min 1 character
  - max 30 characters

- `description` must be:

  - a string
  - min 1 character
  - max 500 characters

- `startTimestamp` must be:

  - a number

- `endTimestamp` must be:

  - a number

- `location` must be:

  - a string
  - min 1 character
  - max 80 characters

- `zipCode` must be:

  - a number
  - a valid ZIP code

- `tags` must be:

  - an array of strings
  - valid tags: "workshop", "campaign", "seminar", "misc"

## Response

### 200 OK

Event created

```json
{
  "id": "string"
}
```

### 400 Bad Request

Invalid parameters, unknown ZIP, or invalid image

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
