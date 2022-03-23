# WebServer + RestServer

## Install and run:

```bash
$ npm install
$ node app
```

## Endpoints

### Auth

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

### Users

* Get users (Auth: user):
```
GET localhost:{port}/api/users #Get users, by default, limit is 5.
GET localhost:{port}/api/users?limit=10&from=4 #Get 10 users from 4th user (paginator).
```

* Add user (Auth: user):
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

* Update user (Auth: user):
```
PUT localhost:{port}/api/users/:id

# Body example:
{
    "name": "NewName",
}
```

* Delete user: (soft delete, only updates `status` flag) (Auth: user + ADMIN_ROLE)
```
DELETE localhost:{port}/api/users/:id
```

### Categories:

* Get categories (Auth: no):
```
GET localhost:{port}/api/categories #Get categories, by default, limit is 5.
GET localhost:{port}/api/categories?limit=10&from=4 #Get 10 categories from 4th categories (paginator).
```

* Get by id (Auth: no):
```
GET localhost:{port}/api/categories/:id
```

* Create (Auth: login):
```
POST localhost:{port}/api/categories

# Body example:
{
    "name": "Example",
}
```

* Update (Auth: login + ADMIN_ROLE):
```
PUT localhost:{port}/api/categories/:id

# Body example:
{
    "name": "Example",
}
```

* Delete (Auth: login + ADMIN_ROLE):
```
DELETE localhost:{port}/api/categories/:id
``` 

### Products:

* Get products (Auth: no):
```
GET localhost:{port}/api/products #Get categories, by default, limit is 5.
GET localhost:{port}/api/products?limit=10&from=4 #Get 10 categories from 4th categories (paginator).
```

* Get by id (Auth: no):
```
GET localhost:{port}/api/products/:id
```

* Create (Auth: login):
```
POST localhost:{port}/api/products

# Body example:
{
    "name": "Product23",
    "description": "ProductDescription23",
    "price": "130",
    "category_name": "Category2"
}
```

* Update (Auth: login + ADMIN_ROLE):
```
PUT localhost:{port}/api/products/:id

# Body example:
{
    "name": "Product23",
    "description": "ProductDescription23-Edit",
    "price": "130",
    "category_name": "Category2"
}
```

* Delete (Auth: login + ADMIN_ROLE):
```
DELETE localhost:{port}/api/products/:id
``` 