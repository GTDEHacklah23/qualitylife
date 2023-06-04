# POST /api/account/updateMeta

Update account metadata

## Parameters

```json
{
  "profileImage": "string",
  "email": "string",
  "zipCode": "number"
}
```

## Validation

- `profileImage` must be:

  - a string

- `email` must be:

  - a string
  - valid email address

- `zipCode` must be:

  - a number
  - 5 digits

## Response

### 200 OK

Account updated

```json
{
  "message": "200 - OK"
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
