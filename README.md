<!-- CI trigger test -->

---

```md
# 🌍 Wanderlust – Full Stack Rental Listing Platform

Wanderlust is a full-stack rental listing web application inspired by Airbnb, built using Node.js, Express, and MongoDB. The project follows MVC architecture and focuses on secure authentication, scalable backend design, automated testing, and CI/CD integration.

🔗 Live Demo: https://wanderlust-2f3n.onrender.com/listings  
🔗 GitHub Repository: https://github.com/your-username/wanderlust

---

## 🚀 Features

- Secure user authentication and authorization using Passport.js
- Cookie-based session management
- CRUD operations for rental listings
- Image uploads and storage using Cloudinary
- RESTful API design with centralized error handling
- Automated backend testing using Jest and Supertest
- Dockerized application using Docker and Docker Compose
- Jenkins CI pipeline to run tests automatically on every GitHub push

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- EJS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js

**DevOps & Testing**
- Docker
- Docker Compose
- Jenkins
- Jest
- Supertest
- Cloudinary

---

## 📁 Project Structure

```

wanderlust/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── tests/
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── app.js
└── README.md

```

---

## ⚙️ Installation & Setup

### Clone the repository
```

git clone [https://github.com/your-username/wanderlust.git](https://github.com/your-username/wanderlust.git)
cd wanderlust

```

### Install dependencies
```

npm install

```

### Environment Variables

Create a `.env` file in the root directory:

```

PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

### Run the application
```

npm start

```

Application runs at: `http://localhost:8080`

---

## 🐳 Run with Docker

```

docker-compose up --build

```

---

## 🧪 Run Tests

```

npm test

```

---

## 🔄 CI/CD Pipeline

- Jenkins pipeline is configured to:
  - Install dependencies
  - Run automated Jest and Supertest test suites
  - Validate builds on every GitHub push

---

## 📌 Future Enhancements

- Property reviews and ratings
- Map-based property listings
- Advanced search and filters
- Payment gateway integration

---



