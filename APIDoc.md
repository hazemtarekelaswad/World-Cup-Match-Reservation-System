# World Cup Reservation System | API Documentation
**Notes**
> any `undefined` field can be ommitted from the body
> `|` means it can accept only any of the values 
<!-- Section -->
## Users
<!-- Endpoint -->
<details><summary><h3>Signup</h3></summary>

**`POST`** | `/users/signup`

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

**`POST`** | `/users/signin`

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

<!-- Endpoint -->
<details><summary><h3>Get user</h3></summary>

**`GET`** | `/users/me`

**Headers**
```
Token: "string"
```

**Response**

status: `400` 
```json
{
    "status": "failure",
    "message": "User does not exist in the system"
}
```

status: `401` 
```json
{
    "status": "failure",
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
```json
{
    "status": "failure",
    "message": "Permission denied, invalid token"
}
```

status: `200`
```json
{
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "birthDate": "date",
    "gender": "M" | "F",
    "nationality": "string",
    "email": "string",
    "role": "fan" | "manager" | "admin",
    "matches": [
        {
            "matchId": "string",
            "seatRow": "number",
            "seatColumn": "number",
            "_id": "string"
        }
    ]
}
```

</details> 

---


<!-- Endpoint -->
<details><summary><h3>Update user</h3></summary>

**`PUT`** | `/users/me`

**Headers**

**`Token:`** "string"

> **NOTE:** *You don't have to provide all body attributes, you can omit what you want, and update what you need*

**Body**
```json
{
    "firstName": "string",
    "lastName": "string",
    "birthDate": "yyyy-mm-dd",
    "password": "string",
    "gender": "M" | "F",
    "nationality": "string",
}
```
Example
```json
{
    "firstName": "Saif",
    "lastName": "Elsayed",
    "birthDate": "1999-09-20",
    "gender": "M",
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
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
```json
{
    "status": "failure",
    "message": "Permission denied, invalid token"
}
```

status: `201`
```json
{
    "status": "success",
    "message": "User has been updated successfully"
}
```

</details> 

---


<!-- Endpoint -->
<details><summary><h3>Reserve seat</h3></summary>

**`PUT`** | `/users/reservation`

**Headers**

**`Token:`** "string"

**Body**
```json
{
    "matchId": "string",
    "seats": [
        {
            "seatColumn": "number",
            "seatRow": "number"
        }
    ],
    "creditCard": "string",
    "pinNumber": "number"
}
```
Example
```json
{
    "matchId": "639a5621051539530761d6e5",
    "seats": [
        {
            "seatColumn": 50,
            "seatRow": 10
        },
        {
            "seatColumn": 43,
            "seatRow": 12
        }
    ],
    "creditCard": "16589764561651",
    "pinNumber": 1259
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
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
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
    "ticket": "string"
}
```

</details> 

---


<!-- Endpoint -->
<details><summary><h3>Cancel seat</h3></summary>

**`PUT`** | `/users/cancellation`

**Headers**

**`Token:`** "string"

**Body**
```json
{
    "matchId": "string",
    "seatColumn": "number",
    "seatRow": "number"
}
```
Example
```json
{
    "matchId": "339a56k1051539530761d655",
    "seatColumn": 15,
    "seatRow": 3
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
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
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
    "message": "Cancelled successfully"
}
```

</details> 

---

<!-- Section -->
## Managers
<!-- Endpoint -->
<details><summary><h3>Get Teams</h3></summary>

**`GET`** | `/teams`

**Response**

status: `200`
```json
{
    "teams": [
        {
            "name": "string"
        }
    ]
}
```
</details>

---

<!-- Endpoint -->
<details><summary><h3>Get Matches</h3></summary>

**`GET`** | `/matches`

**Response**

status: `200`
```json
[
    {
        "matchId": "string",
        "firstTeam": "string",
        "secondTeam": "string",
        "stadium": {
            "name": "string",
            "columnsCount": "number",
            "rowsCount": "number"
        },
        "date": "date",
        "referee": "string",
        "firstLineman": "string",
        "secondLineman": "string",
        "fans": [
            {
                "fanId": "string",
                "seatRow": "number",
                "seatColumn": "number",
                "_id": "string"
            }
        ]
    }
]
```
</details>

---

<!-- Endpoint -->
<details><summary><h3>Get Specfic Match</h3></summary>

**`GET`** | `/matches/:id`

**Response**

status: `200`
```json

{
    "matchId": "string",
    "firstTeam": "string",
    "secondTeam": "string",
    "stadium": {
        "name": "string",
        "columnsCount": "number",
        "rowsCount": "number"
    },
    "date": "date",
    "referee": "string",
    "firstLineman": "string",
    "secondLineman": "string",
    "fans": [
        {
            "fanId": "string",
            "seatRow": "number",
            "seatColumn": "number",
            "_id": "string"
        }
    ]
}

```
</details>

---

<!-- Section -->
## Admins
<!-- Endpoint -->
<details><summary><h3>Get users</h3></summary>

**`GET`** | `/admin/users`

**Response**

status: `200`
```json
[
    {
        "userId": "string",
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "birthDate": "date",
        "gender": "M" | "F",
        "nationality": "string",
        "email": "string",
        "role": "fan" | "manager",
        "status": "approved" | "pending",
        "matches": [
            {
                "matchId": "string",
                "seatRow": "number",
                "seatColumn": "number",
                "_id": "string"
            }
        ]
    }
]
```
</details>

---

<!-- Endpoint -->
<details><summary><h3>Get Pending Users</h3></summary>

**`GET`** | `/admin/getpandeng`

**Headers**

**`Token:`** "string"

**Response**

status: `401` 
```json
{
    "status": "failure",
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
```json
{
    "status": "failure",
    "message": "Permission denied, invalid token"
}
```

status: `200`
```json
{
    "users": [
        {
            "_id": "string",
            "username": "string",
            "password": "string",
            "firstName": "string",
            "lastName": "string",
            "birthDate": "yyyy-mm-dd",
            "gender": "M" | "F",
            "email": "string",
            "role": "fan" | "manager" | "admin",
            "status": "pending",
            "matches": [],
            "__v": 0
        }
    ]
}
```
</details>

---

<!-- Endpoint -->
<details><summary><h3>Approve user</h3></summary>

**`POST`** | `/admin/approve/:id`

**Headers**

**`Token:`** "string"

**Response**

status: `401` 
```json
{
    "status": "failure",
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
```json
{
    "status": "failure",
    "message": "Permission denied, invalid token"
}
```

status: `500` 
```json
{
    "status": "failure",
    "message": "Internal server error"
}
```

status: `200`
```json
{
    "status": "success",
    "message": "approved successfully"
}
```
</details>

---

<!-- Endpoint -->
<details><summary><h3>Delete user</h3></summary>

**`DELETE`** | `/admin/user/:id`

**Headers**

**`Token:`** "string"

**Response**

status: `401` 
```json
{
    "status": "failure",
    "message": "Unauthorized request, provide a token"
}
```

status: `403` 
```json
{
    "status": "failure",
    "message": "<error_msg>"
}
```

status: `404` 
```json
{
    "status": "failure",
    "message": "User has already been deleted"
}
```

status: `500` 
```json
{
    "status": "failure",
    "message": "Internal server error"
}
```

status: `200`
```json
{
    "status": "success",
    "message": "Deleted successfully"
}
```
</details>

---