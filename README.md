# Backend-For-Clothing-Store

## Run Server
Use the prewritten scripts **'start'** or **'dev'** to run the server.

For Production ( uses Node )
```
    npm run start
```
For Devlopment ( uses Nodemon )
```
    npm run dev
```

## API Authentication

Requests need to be authenticated such that any third party cannot request resources on our server.

- ### <code>x-api-key</code> Header
    Added an API key system where every request should contain a token encrypted using the API key which will be decrypted to check if it's valid or not
        
        {
            Headers: {
                ...

                x-api-key: // API Key....
            
                ...
            }
        }

    ### Error
        {
            status: 401,
            message: "Unauthorized"
        }

- ### <code>Authorization</code> Header
    For requests from logged in user the frontend will pass the jwt into this header such that the server can verify and give access to the user.

        {
            Headers: {
                ...
                Authorization: // JWT returned by the server stored in 'auth-token' cookie
                ...
            }
        }

- ### Email Verification
    After JWT verification if the user proceeds to order this middleware will check if the email of the user is verified or not, if not it will redirect it will send the following response

    #### Status Code 300

        {
            message: "Email ID not verified",
            redirectTo: "/email-verification"
        }
        

## Routes

- ### Register
    - **Path** <code>/api/v1/auth/register</code>
    - **Body:**
        ```
            {
                email: "USERNAME",
                password: "PASSWORD",
                fname: // First Name , 
                lname: // Last Name,
                mobile: // 10 digit mobile number
            }
        ```

    - **Authentication:**
        Now we check if user is present in our database, if yes we return an error. Else we enter the usernae and password in the database.
    - **Success:**
        - #### Status Code 200
                {
                    message: "Successfully Registered!",
                    redirectTo: "/"
                }
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
        Now we check if user is present in our database, if yes we set and cookie <code>auth-token</code> as jwt token (uid as payload, default expiry - 2h). Else throw an error.
    
    - **Success:**
        - #### Status Code 200
                {
                    message: "Logged in sucessfully!",
                    redirectTo: "/"
                }

    - **Error:**
        ```
            {
                status: 403,
                message: "Forbidden: User not found!"
            }
        ```
        ```
            {
                status: 401,
                message: "Email or password is wrong"
            }
        ```

- ### Logout

    Logout will be handled in the frontend by simply deleting the <code>auth-token</code> cookie.

- ### Email Verification

- ### Forgot Password

- ### Admin

- ### Products



## Controllers

- ### Image Controller
    Made two controllers to handle image uploads: <code>insertImage</code> and <code>insertMultipleImages</code>. These are to be used inside routes where image uploading is needed. It reads the uploaded image and uploads it to the database while returning the id to reference it in the required places.

    Make sure to use **ERROR HANDLING** when using this controller as it **directly throws error** without passing it to the next middleware.

    **NOTE:** Size checking has not been added yet