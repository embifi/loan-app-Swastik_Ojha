const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6969;
const db = require('./db');
const Loan = require('./models/loan');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authMiddleware');



app.use(express.json());
app.use(cors());

// login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;


    const users = [
        { id: 1, email: 'test@example.com', password: 'password123' },
        { id: 2, email: 'test1@example.com', password: 'password1' },
        { id: 3, email: 'test12@example.com', password: 'password12' },
        { id: 4, email: 'test13@example.com', password: 'password1234' },
        { id: 5, email: 'q@b', password: 'q' },

    ];

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});





// Function to connect to MongoDB
async function connectToDB() {
    try {
        const dbURI =
            'mongodb+srv://swastik:Swastik_Ojha%40123@cluster0.rrvbb4j.mongodb.net/?retryWrites=true&w=majority';
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (err) {

    }
}

// Import the loan and loan type routes
const loanRoutes = require('./routes/loans');
const loanTypeRoutes = require('./routes/loanTypes');
app.use('/api', loanRoutes);


// Function to create and save a dummy loan
async function addDummyLoan() {
    const loanData = {
        loanType: 'PY Loan',
        amount: 18,
        duration: 11,
        interestRate: 5,
    };

    try {
        const loan = new Loan(loanData);
        await loan.save();
        console.log('Loan saved to database!');
    } catch (err) {
        console.error('Error saving loan:', err);
    }
}

// Start the server after connecting to MongoDB and adding the dummy data
connectToDB()
    .then(() => addDummyLoan()) // Add the dummy loan data when the database connection is successful
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
