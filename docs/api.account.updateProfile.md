# POST /api/account/updateProfile

Update account profile

## Parameters

```json
{
  "biography": "string",
  "displayName": "string"
}
```

## Validation

- `biography` must be:

  - a string

- `displayName` must be:

  - a string
  - min 1 character
  - max 12 characters

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
