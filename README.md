# Backend-For-Clothing-Store

## Current Job

- Add crypto part for api key auth.

## API Authentication

Requests need to be authenticated such that any third party cannot request resources on our server.

- ### <code>x-api-key</code> Header
    Added an API key system where every request should contain a token encrypted using the API key which will be decrypted to check if it's valid or not
        
        {
            ...

            Headers: {
                x-api-key: // API Key....
            }

            ...
        }

    ### Error
        {
            status: 401,
            message: "Unauthorized"
        }

## Routes

- ### Register
    - **Path** <code>/api/v1/auth/register</code>
    - **Body:**
        ```
            {
                email: "USERNAME",
                password: "PASSWORD"
            }
        ```

    - **Authentication:**
        Now we check if user is present in our database, if yes we return an error. Else we enter the usernae and password in the database.
    - **Error:**
        ```
            {
                status: 409,
                message: "Already Exists: User already exists!"
            }
        ```

- ### Login
    - **Path:** <code>/api/v1/auth/login</code>
    - **Body:**
        ```
            {
                email: "USERNAME",
                password: "PASSWORD"
            }
        ```

    - **Authentication:**
        Now we check if user is present in our database, if yes we set and cookie as jwt token (uid as payload). Else throw an error.
    - **Error:**
        ```
            {
                status: 403,
                message: "Forbidden: User not found!"
            }
        ```
