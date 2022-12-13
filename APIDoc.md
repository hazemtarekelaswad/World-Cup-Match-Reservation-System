# World Cup Reservation System | API Documentation
**Notes**
> any `undefined` field can be ommitted from the body

> `|` means it can accept only any of the values 
<!-- Section -->
## Users

<!-- Endpoint -->
<details><summary><h3>Signup</h3></summary>

`/users/signup`

**Body**
```json
{
    "username": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "birthDate": "yyyy-mm-dd",
    "gender": "M" | "F",
    "nationality": "string" | undefined,
    "email": "string",
    "role": "fan" | "manager" | "admin"
}
```
Example
```json
{
    "username": "hazem",
    "password": "123456789",
    "firstName": "Hazem",
    "lastName": "Elaswad",
    "birthDate": "2000-09-20",
    "gender": "M",
    "nationality": "Egyptian",
    "email": "hazem@gmail.com",
    "role": "fan"
}
```
**Response**

status: `400` 
```json
{
    "status": "failure",
    "message": "<error_msg>"
}
```

status: `500` 
```json
{
    "status": "failure",
    "message": "Internal server error"
}
```

status: `201`
```json
{
    "status": "success",
    "message": "User has been created successfully"
}
```
</details>

---

<!-- Endpoint -->
<details><summary><h3>Signin</h3></summary>

`/users/signin`

**Body**
```json
{
    "username": "string",
    "password": "string"
}
```
Example
```json
{
    "username": "hazem",
    "password": "123456789",
}
```
**Response**

status: `400` 
```json
{
    "status": "failure",
    "message": "<error_msg>"
}
```

status: `401` 
```json
{
    "status": "failure",
    "message": "<error_msg>"
}
```

status: `403` 
```json
{
    "status": "failure",
    "message": "Username is incorrect"
}
```

status: `200`
```json
{
    "status": "success",
    "message": "User signed in successfully",
    "token": "<token>"
}
```

</details> 

---

