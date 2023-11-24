# Bon Voyage: Flight booking System Web Application
![Alt text](public/BonVoyage.jpeg)
<br>

This project has been developed using Java Spring boot and ReactJS

## Node/NPM Versions
I'm running node v12.0.0 and npm v7.19.0 as I tinker, there's no plan to
support older versions at the moment.
<br>

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

