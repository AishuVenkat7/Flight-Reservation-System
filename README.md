# Flight Reservation System

## Overview

The Flight Reservation System is a robust software solution designed to optimize airline operations by enhancing the efficiency of flight reservations, ticketing, and related administrative tasks. This system provides a seamless and user-friendly interface for both customers and airline administrators, ensuring a secure and smooth flight booking process.

## Key Features

- **User Registration and Authentication**: Secure signup and login processes for system access.
- **Flight Search and Booking**: An intuitive search interface that allows users to search for flights based on destination, date, and class, with a variety of filtering options to find the best available flights.
- **Seat Selection**: Users can choose their preferred seats at the time of booking.
- **Reservation Management**: Dashboard for users to manage their bookings, including modifications and cancellations.
- **Admin Panel**: Specialized dashboard for administrators to manage flights, reservations, user data and handle customer inquiries efficiently..

## Technology Stack

- **Backend**: Java with Spring Boot
- **Frontend**: ReactJS
- **Database**: MySQL
- **API Testing**: Postman

## System Architecture

This system is built using a layered architecture that includes controllers and services promoting modular development and scalability. The usecase and ER diagrams in our documentation provide a clear picture of the system's structure and workflow.

<img width="572" alt="image" src="https://github.com/user-attachments/assets/c4768660-8232-4cf8-b31c-436ea3870c56">
![image](https://github.com/user-attachments/assets/a22418b6-af8a-467c-9d96-4df9492996a0)
![entity-relationship-diagram drawio](https://github.com/user-attachments/assets/7809f95b-1b35-41e4-86b3-ff4fe7286456)

# Installation and Setup Instructions
Clone down this repository. You will need `node` and `npm` installed globally on your machine.

### Installation:
Install npm modules:
`npm install`

To Start Server:
`npm start`

To Visit App:
`localhost:3000`

In case of any errors (ensure the number of vulnerabilities is less than 10 - sometimes running twice helps!)
`npm audit fix --force`

Installing database component for react
`npm install react-data-table-component`
Landing page is `home.jsx`, add all routes in it

<br>

# Creating google authentication
1. Login to https://console.cloud.google.com/
2. Go to APIs & Services, click on Credentials in the left pane
3. Click on create credentials, select OAuth Client ID request
4. Select application as Web Application, give it a name
5. Provide Authorised JavaScript origins as 
"http://127.0.0.1:3000"
"http://localhost:3000"
6. Provide Authorised redirect URIs as  
"http://127.0.0.1:3000/callback"
"http://localhost:3000/callback"

# Screenshot:

![image](https://github.com/user-attachments/assets/4a771446-33f4-44aa-bf33-ba31e2258557)
![image](https://github.com/user-attachments/assets/cdfcd898-5f33-4460-8901-82aed769bdf2)
![image](https://github.com/user-attachments/assets/c60fbc8d-28f8-49d9-a1d2-0ca201d14b9c)
![image](https://github.com/user-attachments/assets/efc205e0-c42c-4529-9e4c-7b4367681a52)




