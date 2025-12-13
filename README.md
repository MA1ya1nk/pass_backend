# 🔐 Password Manager – Backend

A secure and scalable **Password Manager backend** built with modern backend technologies. This project handles authentication, encryption, and CRUD operations for storing user credentials safely.

---

## 🚀 Live API

👉 **Live Backend URL:** [https://password-manager-amjc.onrender.com/](https://password-manager-amjc.onrender.com/)

> Replace the link above with your deployed backend URL (Render / Railway / Vercel / AWS / etc.)

---

## 🖥️ Frontend (Optional)

👉 **Frontend Live App:** [https://password-manager12.vercel.app/](https://password-manager12.vercel.app/)

---

## 📸 Screenshots

> Add screenshots inside a `screenshots/` folder and reference them below.

| Feature             | Preview                           |
| ------------------- | --------------------------------- |
| API Health Check    | ![Health](screenshots/health.png) |
| Authentication Flow | ![Auth](screenshots/auth.png)     |
| Password CRUD       | ![CRUD](screenshots/crud.png)     |

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (Password Hashing)
* Crypto / AES Encryption

**Frontend**

* HTML
* TailwindCSS
* JavaScript
* React


**Tools & Services**

* Postman (API Testing)
* MongoDB Atlas
* Render(Backend Deployment)
* VS code(for development)
* Vercel(frontend deployment)


---

## ✨ Features

* 🔐 Secure user authentication (JWT)
* 🔑 Encrypted password storage
* 👤 User-specific password vault
* ➕ Add, ✏️ update, 🗑 delete credentials
* 🔍 Fetch stored passwords securely
* 🛡️ Environment-based configuration
* ⚡ RESTful API architecture

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── app.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory of Backend:

```env
PORT = 3000
DB_NAME=password
MONGODB_URI = <YOUR_MONGO_URI>
CORS_ORIGIN = http://localhost:5173
ACCESS_TOKEN_SECRET = <LARGE_ALPHANUMERIC_VALUE>
ACCESS_TOKEN_EXPIRY = 1d
REFRESH_TOKEN_SECRET = <LARGE_ALPHANUMERIC_VALUE>
REFRESH_TOKEN_EXPIRY=10D
```
Create a `.env` file in the root directory of Frontend:

```env
VITE_BACKEND_URL=http://localhost:3000
```



> ⚠️ Never expose `.env` files in production or GitHub.

---

## 📌 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/users/register` | Register new user |
| POST   | `/user/login`    | Login user        |

### 🔑 Password Manager

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| GET    | `/users/passwords`     | Get all saved passwords |
| POST   | `/users/addPasswords`     | Add new password        |
| PUT    | `/users/updatePasswords/` | Update password         |
| DELETE | `/users/deletePasswords/` | Delete password         |

---

## 🧪 API Testing

Use **Postman** or **Thunder Client**:

1. Authenticate user → get JWT token
2. Pass token in headers:

```http
Authorization: Bearer <token>
```

3. Access protected routes

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/password-manager-backend.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🚀 Deployment

* Backend deployed on **Render**
* Frontend deployed on **vercel**
* MongoDB hosted on **MongoDB Atlas**
* Environment variables configured in deployment dashboard

---

## 🔒 Security Practices

* Passwords hashed using **bcrypt**
* Sensitive data encrypted before storing
* JWT-based authentication
* Protected routes with middleware

---

## 📈 Future Enhancements

* 🔐 Two-Factor Authentication (2FA)
* 📱 Mobile-friendly API usage
* 🧠 Password strength analysis
* 🔄 Password sharing with permissions

---

## 👨‍💻 Author

**Mayank Kumar**

* GitHub: [https://github.com/your-username](https://github.com/your-username)
* LinkedIn: [https://linkedin.com/in/your-linkedin](https://linkedin.com/in/your-linkedin)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the **MIT License**.
