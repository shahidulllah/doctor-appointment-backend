# Doctor-Patient Appointment Management System

A REST API for managing appointments between doctors and patients, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- JWT-based authentication with role-based access control
- Doctor registration and profile management
- Service management for doctors
- Availability scheduling
- Appointment booking and management
- Patient registration and profile
- Doctor search and filtering

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (for validation)
- JWT (Authentication)
- bcryptjs (Password Hashing)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Postman (for API testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shahidulllah/doctor-appointment-backend.git
   cd doctor-patient-appointment-system
   npm install

2. Create **.env** File
 ```bash
 PORT=5000
 DATABASE_URI=mongodb uri
 JWT_SECRET=your_jwt_secret_key

 # Optional Cloudinary
 CLOUDINARY_NAME=your_cloud_name
 CLOUDINARY_API_KEY=your_api_key
 CLOUDINARY_API_SECRET=your_secret 
```

# 🩺 Doctor–Patient Appointment Management System API

A complete RESTful API for managing doctors, patients, appointments, services, and availability using Node.js, Express, MongoDB, and TypeScript.

---

## 🔐 Authentication Routes

| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| POST   | `/auth/register-doctor`     | Register a new doctor     |
| POST   | `/auth/register-patient`    | Register a new patient    |
| POST   | `/auth/login`               | Login and receive JWT     |

---

## 👨‍⚕️ Doctor Module

### 🔧 Service Management

| Method | Endpoint                      | Description          |
|--------|-------------------------------|----------------------|
| POST   | `/doctor/services`            | Add a service        |
| PATCH  | `/doctor/services/:id`        | Edit a service       |
| DELETE | `/doctor/services/:id`        | Delete a service     |

### 📅 Availability Management

| Method | Endpoint                             | Description                  |
|--------|--------------------------------------|------------------------------|
| POST   | `/doctor/availability`               | Set or update availability   |
| GET    | `/doctor/availability`               | Get all availability slots   |
| DELETE | `/doctor/availability/:id`           | Delete a time slot           |

### 📋 Appointment Management

| Method | Endpoint                                           | Description                         |
|--------|----------------------------------------------------|-------------------------------------|
| GET    | `/doctor/appointments?status=pending`              | View appointments by status         |
| PATCH  | `/doctor/appointments/:id/status`                  | Accept, cancel, or complete request |

---

## 👤 Patient Module

### 🧑‍⚕️ Browse & View Doctors

| Method | Endpoint                      | Description                                           |
|--------|-------------------------------|-------------------------------------------------------|
| GET    | `/patient/doctors`            | View all doctors with filters                         |
| GET    | `/patient/doctors/:id`        | View doctor profile + services + availability         |

### 📅 Appointment Management

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/appointments`        | Book an appointment             |
| GET    | `/appointments`        | View all patient appointments   |

---

## 🧑‍💼 Admin Module (Optional)

| Method | Endpoint          | Description                         |
|--------|-------------------|-------------------------------------|
| GET    | `/admin/stats`    | Get total doctors, patients, appts  |

---

## 📸 Doctor Profile Upload (Optional)

| Method | Endpoint                    | Description                   |
|--------|-----------------------------|-------------------------------|
| POST   | `/doctor/upload-image`      | Upload doctor profile image   |

---

## 🔐 Authorization

### Protected Routes
- All endpoints except `/auth/register-doctor`, `/auth/register-patient`, and `/auth/login` require authentication
- Include the JWT token in the Authorization header:

