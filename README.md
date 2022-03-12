# WebServer + RestServer

## Install and run:

```bash
$ npm install
$ node app
```

## App: Endpoints

* Init (creates a Admin user to start to use this app):
```
GET localhost:{port}/api/auth/init
```

* Login (to get a JWT token):
```
POST localhost:{port}/api/auth/login

# Body example:
{
    "mail": "mymail@mail.com",
    "password": "supersecret"
}
```

* Get users:
```
GET localhost:{port}/api/users #Get users, by default, limit is 5.
GET localhost:{port}/api/users?limit=10&from=4 #Get 10 users from 4th user (paginator).
```

* Add user:
```
POST localhost:{port}/api/users/add

# Body example:
{
    "name": "Node",
    "mail": "mymail@mail.com",
    "password": "supersecret",
    "role": "USER_ROLE"
}
```

* Update user:
```
PUT localhost:{port}/api/users/:id

# Body example:
{
    "name": "NewName",
}
```

* Delete user: (soft delete, only updates `status` flag)
```
DELETE localhost:{port}/api/users/:id
```