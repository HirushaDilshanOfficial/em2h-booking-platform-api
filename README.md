# EM2H Booking Platform API

## 1. Project Overview
This is a backend API for a Booking Platform built using NestJS, Prisma ORM, and PostgreSQL. It allows customers to browse services and make bookings. It also includes an authentication system with Role-Based Access Control (RBAC), where Admins can manage services and all bookings, while normal users can only manage their own bookings. Guest users can also make bookings without an account.

## 2. Installation Steps
To set up the project on your local machine, follow these steps:

1. Clone the repository.
2. Open your terminal and navigate to the project folder.
3. Run the following command to install all necessary dependencies:
   
   npm install
   

## 3. Environment Variables
You need to set up environment variables for the database and security. Create a .env file in the root folder and add the following details:


# Database connection string 
DATABASE_URL="postgresql://username:password@hostname:port/dbname?schema=public"

# Secret key for generating JWT tokens
JWT_SECRET="your-very-secret-key-here"

# Port for the server to run on
PORT=3000


## 4. Database Setup
We are using PostgreSQL (NeonDB). Make sure your database is running and you have copied the connection URL into your .env file as shown above.
(Prisma ORM)

## 5. Running Migrations
To create the tables in your database and generate the Prisma Client, run the following command. This will apply the SQL files inside the prisma/migrations folder to your database:
npx prisma migrate dev






## 6. Running the Application
Once the database is set up, you can start the application using the development server:


npm run start:dev

The API will be available at `http://localhost:3000`.

## 7. API Documentation
A full guide on how to test the APIs using Postman is available in the API_DOCUMENTATION.txt file located in the root of this project. It covers Authentication, Services, and Bookings.

## 8. Assumptions Made
During the development of this project, the following assumptions were made:
- Only Admin users have the authority to create, update, or delete "Services".
- Customers can make bookings even without logging in (Guest checkout).
- Users who are logged in can only view and cancel their own bookings.
- Deleting a booking does not permanently remove it from the database; instead, it changes the status to "CANCELLED".
- Date validation ensures that users cannot book a service for a date in the past.

## 9. Future Improvements
Here are some features that can be added in the future to improve the platform:
 Email Notifications: Send confirmation emails to customers when a booking is made.
 unit tsting
 docker support

## 10. optional feature 
Search and fillters
