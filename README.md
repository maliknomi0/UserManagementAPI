
# Node.js User Management API

A simple Node.js API for user management including functionalities for login, signup, editing profile, changing password, and uploading images.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

The API server should now be running on `http://localhost:3001`.

---

## API Endpoints

### 1. User Login

- **Endpoint**: `POST /api/login`
- **Description**: Allows an existing user to log in with their email and password.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  - Success: Returns a JSON object containing the authentication token.
  - Error: Returns an error message if login credentials are incorrect.

### 2. User Signup

- **Endpoint**: `POST /api/signup`
- **Description**: Allows a new user to create an account.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "phoneNumber": "1234567890",
    "password": "your_password",
    "fullName": "User Full Name",
    "dateOfBirth": "YYYY-MM-DD",
    "gender": "male"
  }
  ```
- **Response**:
  - Success: Returns a message indicating successful signup.
  - Error: Returns an error message if the email is already in use.

### 3. Edit User Profile

- **Endpoint**: `PUT /api/user/edit`
- **Description**: Allows users to edit their profile details.
- **Headers**: Requires Bearer Token for authentication.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "phoneNumber": "1234567890",
    "fullName": "New Full Name",
    "dateOfBirth": "YYYY-MM-DD",
    "gender": "male",
    "address": "user address",
    "avatar": "avatar_file_name.png"
  }
  ```
- **Response**:
  - Success: Returns the updated user profile data.
  - Error: Returns an error message if the token is invalid or request is malformed.

### 4. Change Password

- **Endpoint**: `PUT /api/change-password`
- **Description**: Allows users to change their password.
- **Headers**: Requires Bearer Token for authentication.
- **Request Body**:
  ```json
  {
    "oldPassword": "old_password",
    "newPassword": "new_password"
  }
  ```
- **Response**:
  - Success: Returns a message indicating the password has been changed.
  - Error: Returns an error message if the old password is incorrect or token is invalid.

### 5. Upload Image

- **Endpoint**: `POST /api/upload`
- **Description**: Allows users to upload an image file.
- **Headers**: Requires Bearer Token for authentication.
- **Form Data**:
  - **Key**: `file` (file data to upload)
- **Response**:
  - Success: Returns the URL or filename of the uploaded image.
  - Error: Returns an error message if upload fails.

---

## Authentication

Each authenticated endpoint requires a Bearer Token. Pass this token in the header for requests needing authorization.

```plaintext
Authorization: Bearer YOUR_TOKEN_HERE
```

## Example Requests

### Login Example
```bash
curl -X POST http://localhost:3001/api/login -H "Content-Type: application/json" -d '{
  "email": "tnoman036@gmail.com",
  "password": "12345678"
}'
```

### Signup Example
```bash
curl -X POST http://localhost:3001/api/signup -H "Content-Type: application/json" -d '{
  "email": "tnoman036@gmail.com",
  "phoneNumber": "1234567890",
  "password": "1234567",
  "fullName": "Noman Tariq",
  "dateOfBirth": "2002-06-06",
  "gender": "male"
}'
```

### Edit Profile Example
```bash
curl -X PUT http://localhost:3001/api/user/edit -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN_HERE" -d '{
  "email": "tnoman036@gmail.com",
  "phoneNumber": "1234567890",
  "fullName": "M.Noman Tariq",
  "dateOfBirth": "2000-01-05",
  "gender": "male",
  "address": "house No-77",
  "avatar": "1730227692386_cropped-cropped-2-180x180-1-270x270.png"
}'
```

### Change Password Example
```bash
curl -X PUT http://localhost:3001/api/change-password -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN_HERE" -d '{
  "oldPassword": "1234567",
  "newPassword": "12345678"
}'
```

### Upload Image Example
```bash
curl -X POST http://localhost:3001/api/upload -H "Authorization: Bearer YOUR_TOKEN_HERE" -F file=@/path/to/your/image.jpg
```

---

## Contact

Feel free to reach out with any questions, suggestions, or feedback.

- **GitHub**: [github.com/maliknomi0](https://github.com/maliknomi0)
- **LinkedIn**: [linkedin.com/in/maliknomi0](https://linkedin.com/in/maliknomi0)
- **WhatsApp**: +92 370 0204207

---

## License

This project is licensed under the MIT License.
```

