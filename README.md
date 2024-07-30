# Backend Development Report for PLASHOE

## Project Overview:

For my final year project, I developed an ecommerce website named PLASHOE, focused on providing a seamless online shopping experience for shoe enthusiasts. This report outlines the steps taken in the backend development phase, highlighting the use of Express, Prisma, and MySQL.

### Technologies Used:

Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Prisma: A next-generation ORM that helps build scalable and performant databases by simplifying database access.
MySQL: A relational database management system used for storing and managing data.

### Steps Taken:

### Project Setup:

Initialized a new Node.js project and installed necessary dependencies, including Express, Prisma, and MySQL.
Configured environment variables to manage sensitive data such as database credentials.

### Database Design:

Designed the database schema to accommodate the necessary entities, such as Users, Products, Orders, and CartItems.
Used Prisma to define the data models and relationships between entities, ensuring a structured and efficient database layout.

### API Development:

Set up Express to handle HTTP requests and responses, creating RESTful API endpoints for various functionalities.
Developed endpoints for user authentication (signup, login), product management (CRUD operations), order processing, and cart management.
Ensured proper validation and sanitization of input data to prevent security vulnerabilities such as SQL injection and XSS attacks.

### Database Integration with Prisma:

Configured Prisma to connect with the MySQL database, generating the necessary client and migration files.
Implemented database queries using Prisma’s client API, ensuring efficient data retrieval and manipulation.
Ran migrations to apply schema changes to the database and seed initial data for testing.

### Authentication and Authorization:

Implemented JWT-based authentication to secure API endpoints, ensuring only authorized users could access certain resources.
Created middleware to handle authentication and authorization checks, enhancing security and access control.

### Error Handling and Logging:

Set up centralized error handling to manage different types of errors and provide meaningful responses to the client.

### Testing and Debugging:

Conducted thorough testing of API endpoints using Postman.
Debugged issues identified during testing, ensuring reliable and correct functionality.
Performed load testing to ensure the backend could handle multiple concurrent requests and maintain performance under stress.

### Deployment:

Prepared the application for deployment by configuring environment variables and setting up necessary scripts.
Deployed the backend on a cloud platform, ensuring proper scaling and availability.
Monitored the deployed application for any issues and performed necessary optimizations.

### Challenges and Solutions:

Database Migrations: Managing database schema changes during development was challenging. Using Prisma’s migration tools helped automate and track changes, ensuring consistency across environments.
Authentication Complexity: Implementing secure and efficient authentication mechanisms required careful planning. Utilizing JWT tokens provided a robust solution for managing user sessions.

## Conclusion:

The backend development of PLASHOE was a comprehensive exercise in modern web development practices. By leveraging Express, Prisma, and MySQL, I was able to create a scalable, secure, and efficient backend for the ecommerce website. This phase of the project enhanced my understanding of server-side development, database management, and API design, preparing me for real-world backend development scenarios.
