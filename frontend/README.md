# CampusCore - School Management System

**CampusCore** is a modern, full-stack MERN application designed to streamline school administration. It provides a clean dashboard for managing students, classes, and subjects, with a specific focus on academic performance tracking and attendance.

##  Features

* **Custom Branding**: Fully branded with a unique "CampusCore" splash screen and theme.
* **Admin Dashboard**: Quick overview of system-wide statistics including total students, classes, and subjects.
* **Student Management**: Detailed student profiles with academic history and roll number tracking.
* **Academic Records**: Specialized "Marks Entry" system to update and visualize exam results.
* **Dark Mode Support**: Toggle between light and dark themes for a personalized user experience.
* **Secure Authentication**: JWT-based login and registration with hashed passwords for admins.

##  Tech Stack

* **Frontend**: React.js, Material-UI (MUI), Axios, React Router.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB (Local or Atlas).
* **Security**: Bcrypt.js for hashing and JSON Web Tokens (JWT).


## Installation & Setup

### 1. Prerequisites

* Node.js installed on your machine.
* MongoDB Compass or a running MongoDB instance.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/CampusCore.git
cd CampusCore

### 3. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` folder and add:

```text
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

Start the server:

```bash
npm start

```

### 4. Frontend Setup

Navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install

Start the application:

```bash
npm start

## Screenshots

> **Note**: Your dashboard currently tracks **7 Students**, **4 Classes**, and **3 Subjects** based on the local MongoDB setup.

##  Contributing

Contributions are welcome! If you have a feature request or find a bug, please open an issue or submit a pull request.

##  License

This project is licensed under the MIT License.