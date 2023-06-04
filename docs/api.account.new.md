# POST /api/account/new

Create a new account

## Parameters

```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "zipCode": "number"
}
```

## Validation

- `username` must be:

  - a string
  - min 3 characters
  - max 12 characters
  - alphanumeric

- `password` must be:

  - a string
  - min 8 characters
  - max 30 characters
  - 2+ letters
  - 2+ digits or symbols

- `email` must be:

  - a string
  - valid email address

- `zipCode` must be:

  - a number
  - 5 digits

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

Invalid parameters or unknown ZIP

```json
{
  "error": "400 - Bad Request"
}
```
