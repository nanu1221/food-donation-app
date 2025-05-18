const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // your MySQL username
  password: '',        // your MySQL password (empty by default)
  database: 'food_donation' // replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Example route
app.get('/', (req, res) => {
  res.send('Food Donation App is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
