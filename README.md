    Patient Dashboard Application

![Alt Text](/frontend/public/images/signup-sc.png)
![Alt Text](/frontend/public/images/login-sc.png)
![Alt Text](/frontend/public/images/dashboard-sc.png)


Table of Contents
Overview
Features
Technologies Used
Installation
Usage
API Endpoints
Contributing
License
Contact
Overview
The Patient Dashboard application is a user-friendly interface designed for healthcare professionals to manage and view patient records efficiently. It provides features such as searching and filtering patients based on various criteria, including age and name. This application enhances patient management, making it easier for healthcare providers to access important patient information quickly.

Features
User Authentication: Secure login and authentication for healthcare professionals.
Patient Management: View, search, and filter patient records.
Responsive Design: Mobile-friendly layout for on-the-go access.
Pagination: Efficient navigation through patient records.
Age Filtering: Filter patients by minimum and maximum age.
Search Functionality: Quick search for patients by name.
Technologies Used
Frontend:

React
React Router
Tailwind CSS
Axios for API calls
Backend:

Node.js
Express
MongoDB (for database management)
JWT (for authentication)

Installation
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v14 or higher)
MongoDB (for database)
Clone the Repository
bash
Copy code
git clone https://github.com/yasimjidhu/Healio.git
Install Dependencies

Copy code
npm install
Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the Application
Start the Backend Server (navigate to the backend directory):

cd backend
npm start       

Start the Frontend:

cd frontend
npm start

API Endpoints
Authentication

POST /api/users/register - Authenticate user
POST /api/users/login - Authenticate user and return a JWT token.

Patients
GET /api/patients - Retrieve a list of patients with pagination.
GET /api/patients/:id - Get details of a specific patient.
POST /api/patients - Add a new patient.

Contributing
We welcome contributions! If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix:
bash
Copy code
git checkout -b feature/YourFeatureName
Commit your changes:

git commit -m "Add a new feature"
Push to the branch:
bash
Copy code
git push origin feature/YourFeatureName
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for more information.

Contact
For questions, suggestions, or feedback, please contact:

Email - dirshadyasim@gmail.com
GitHub: yasimjidhu