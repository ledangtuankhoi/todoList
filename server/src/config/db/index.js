const mongoose = require('mongoose');

async function connect() {
 
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gkvyg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
        console.log(`MongoDB connected ${process.env.DB_NAME}\n`);
    } catch (error) {
        console.log('MongoDB connect failed\n');
        console.log(error);
    }
}

module.exports = connect