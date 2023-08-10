const mongoose = require('mongoose');

// Function to connect to MongoDB
async function connectToDB() {
    try {
        const dbURI = "mongodb+srv://swastik:Swastik_Ojha%40123@cluster0.rrvbb4j.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectToDB;
