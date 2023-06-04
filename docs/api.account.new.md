# POST /api/account/new

Create a new account

## Parameters

```json
{
  "username": "string",
  "password": "string"
}
```

## Validation

- `username` must be:

  - a string
  - min 3 characters
  - max 30 characters
  - alphanumeric

- `password` must be:

  - a string
  - min 8 characters
  - max 30 characters
  - alphanumeric

## Response

### 200 OK

Account created

```json
{
  "username": "string"
}
```

### 409 Conflict

Username already exists

```json
{
  "error": "409 - Conflict"
}
```

### 400 Bad Request

Invalid parameters

```json
{
  "error": "400 - Bad Request"
}
```
