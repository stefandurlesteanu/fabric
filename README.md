# local development

1. Make sure you have Docker installed on your machine
2. Rum `make up` to build and start containers
3. 2 users are provider: DOCTOR, ADMIN
4. Generate a new JWT token [here](http://localhost:3001/authentication/sign-in). It is a POST request that
  - If you want to create <b>prescriptions</b> log in as a DOCTOR
    ```json
     {
       "email": "doctor@example.com",
       "password": "adminpassword",
     }
     ```
  - If you want to interact with <b>IAM</b>, log in as a ADMIN
    ```json
     {
       "email": "admin@example.com",
       "password": "adminpassword",
     }
     ```

  - Use Bearer token in header

4. Access resources
5. Run tests --> ```yarn run test``` or ```npx yarn run test```
