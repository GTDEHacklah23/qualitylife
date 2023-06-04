# POST /api/account/login

Login to an existing account

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

## Response

### 200 OK

Login successful. Session cookie set.

```json
{
  "username": "string"
}
```

### 401 Unauthorized

Either the username or password is incorrect

```json
{
  "error": "401 - Unauthorized"
}
```

### 400 Bad Request

Invalid parameters

```json
{
  "error": "400 - Bad Request"
}
```
