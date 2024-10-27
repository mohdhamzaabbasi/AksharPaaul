# AksharPaaul Attendance System

Project Overview
The AksharPaaul Attendance System is a web application designed to facilitate attendance tracking for an NGO named Akshar Paaul. The application allows teachers to mark attendance, view past attendance records, and generate reports for student attendance. With features to manage multiple schools and classes, this tool enhances accountability and organization in attendance management.

Tech Stack
Backend: Node.js with Express.js
Templating Engine: EJS (Embedded JavaScript) for dynamic web page rendering
Database: MySQL, with setup script provided
Other Libraries:
method-override: Enables HTTP methods such as PUT and DELETE in places where the client only supports POST
nodemon: Used during development to auto-reload the server upon code changes

Project Structure
index.js: Main entry point for the server
package.json: Contains project metadata and dependencies
Setup.sql: SQL file for setting up the database schema and tables
Setting Up the Project Locally
Prerequisites

Node.js (v14 or later)
MySQL Server
Git (optional for cloning)
Installation Steps

Clone the Repository

git clone <repository_url>
cd AksharPaaul

Install Dependencies Run the following command to install all required dependencies as defined in package.json:

npm install

Database Setup

Open your MySQL database client and create a new database, e.g., aksharpaaul_db.
Run the SQL setup script to create the required tables:
Update the database configuration in index.js or any configuration file to match your MySQL credentials.

Running the Application Start the application with:
nodemon index.js

Once the server is running, open a browser and go to http://localhost:8080 to access the application.
Usage
Take Attendance: Mark students as present or absent.
Modify Attendance: Update attendance records for a specific date or class.
View Past Attendance: Browse attendance records by class or student.

View demo of the project--> https://drive.google.com/file/d/1lbfoYq-Pqau5jM5MjyomvBECnBBTh7L_/view?usp=sharing
