const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to db")
    }
    catch (err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB;
