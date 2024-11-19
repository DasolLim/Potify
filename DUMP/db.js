const { createConnection } = require('mysql');

// FIRST cd to the DUMP folder
// THEN TO RUN THE SCRIPT RUN: 'node db.js'

// HOW TO USE:
// do 'npm i mysql' to download dependencies
// also do 'npm -y' to initialize package.json
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    // CHANGE WITH YOUR MYSQL PASSWORD
    password: '123!@#QWEasdzxc',
    database: 'Potify',
    port: 3306,
});

connection.connect();