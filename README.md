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
<img width="479" alt="Screenshot 2024-09-06 at 8 37 49 PM" src="https://github.com/user-attachments/assets/8a784b72-54bb-4d57-bf1f-5c2771d92ff8">
<img width="802" alt="Screenshot 2024-09-06 at 8 37 03 PM" src="https://github.com/user-attachments/assets/1035bc27-b595-4f9f-8987-f9706b236eda">

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

<img width="794" alt="Screenshot 2024-09-06 at 8 42 52 PM" src="https://github.com/user-attachments/assets/0d267a51-81ae-49d9-b9bd-77dce6a367d3">
<img width="794" alt="Screenshot 2024-09-06 at 8 43 39 PM" src="https://github.com/user-attachments/assets/4565c2ec-10e3-4afa-b4b6-9689e07f2227">
<img width="794" alt="Screenshot 2024-09-06 at 8 44 03 PM" src="https://github.com/user-attachments/assets/af68a561-eae2-4ec1-87b0-4c5b9d06f231">
<img width="794" alt="Screenshot 2024-09-06 at 8 46 13 PM" src="https://github.com/user-attachments/assets/5af4c851-d60a-419b-a41d-28ecef6baed6">







