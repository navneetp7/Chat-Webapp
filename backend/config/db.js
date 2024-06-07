const mongoose = require ("mongoose");
const connectdb= async() =>{
    try {
        const conn = await mongoose.connect(process.env.Mongo_uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error:${error.message}`.red.bold);
        process.exit();
    }
};
module.exports = connectdb;