# POST /api/event/leave

Leave an event

## Parameters

```json
{
  "id": "string"
}
```

## Validation

- `id` must be:

  - a string

## Response

### 200 OK

Event left successfully

```json
{
  "message": "200 - OK"
}
```

### 400 Bad Request

Invalid parameters, or event already joined

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
