// backend/database.js

const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username', // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'batch_schedule_db', // Replace with the name of your database
    multipleStatements: true // Allow execution of multiple queries
});

// Function to create database and 'batches' table
function createDatabase() {
    const dbName = 'batch_schedule_db';

    pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (error, results) => {
        if (error) {
            console.error('Error creating database:', error);
            return;
        }

        console.log(`Database ${dbName} created successfully`);

        // Create 'batches' table
        pool.query(`USE ${dbName};
                    CREATE TABLE IF NOT EXISTS batches (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        starting_date DATE,
                        current_week INT,
                        live_item VARCHAR(255)
                    );`, (error, results) => {
            if (error) {
                console.error('Error creating table:', error);
                return;
            }

            console.log('Table "batches" created successfully');
        });
    });
}

// Call function to create database and table
createDatabase();

module.exports = pool;
