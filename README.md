# SmartShorter

## Description

SmartShorter is a web application that allows users to shorten and manage their URLs efficiently. It provides a simple
and convenient way to create shortened links that can be easily shared.

## Features

- Shorten long URLs into shorter, more manageable links.
- View a list of all created short links.
- Edit existing short links to update their destination URLs.
- Activate and deactivate short links based on the current environment.
- Responsive design for optimal usage on both desktop and mobile devices.

## Technologies Used

- React.js: Front-end JavaScript library for building user interfaces.
- Bootstrap: CSS framework for responsive and modern web design.
- Node.js: Back-end JavaScript runtime environment.
- Express: Web application framework for Node.js.
- MongoDB: NoSQL database for storing and managing link data.
- Axios: HTTP client for making API requests to the server.
- Toastify: Notification library for displaying success and error messages.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository.

```
git clone https://github.com/Abdallahhany/SmartShorter.git
```

2. backend installation

```
cd smartshorter-api
npm install
```

3. frontend installation

```
cd smartshorter-client
npm install
```

4. create .env file in smartshorter-api directory and add the following

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/smartshorter
CORS_ORIGIN=http://localhost:3000
```

5. create .env file in smartshorter-client directory and add the following

```
REACT_APP_SHORTLINKS_API_URL=http://localhost:5000/api/shortlinks
```

6. Run the server.

```
cd smartshorter-api
npm start
```

7. Run the client.

```
cd smartshorter-client
npm start
```

8. Open the application.

```
http://localhost:3000
```

## Acknowledgements

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)

## Credits

This project was built by Abdallah Rashed as a demonstration of Backend skills.



