const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Mongodb Connected')
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);    
    }
}

module.exports = connectDB