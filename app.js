const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();

const PORT = 3001;

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skincare'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for user login
app.post('/login', (req, res) => {
    const { name, phone } = req.body;

    // Insert user into the database
    db.query('INSERT INTO users (name, phone) VALUES (?, ?)', [name, phone], (error) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).send('Error registering user');
        }
        res.redirect('/product.html'); // Redirect to the product page after login
    });
});

// Route for the product page
app.get('/product.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
