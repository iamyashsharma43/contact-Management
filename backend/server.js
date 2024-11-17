const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the app and environment variables
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://yashsharm43:L99yMkJQpubDddVi@cluster0.w66dn.mongodb.net/customer';

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process on connection failure
    });

// Root route for testing server status
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Contact Management API!' });
});

// Import and use the contacts router
const contactsRouter = require('./routes/contact');
app.use('/contacts', contactsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
