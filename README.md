# local development

1. Make sure you have Docker installed on your machine
2. Rum `make up` to build and start containers
3. Create an account at [Sign up](http://localhost:3000/authentication/sign-up). POST request.

   - Use `doctor` role to have access to all resources

     ```json
     {
       "email": "doctor@fabric.com",
       "password": "@StrongPassword123!",
       "role": "doctor"
     }
     ```

   - Generate a new JWT token [here](http://localhost:3000/authentication/sign-in). It is a POST request that requires a body with your email and password
   - Use Bearer token in header

4. Access resources
