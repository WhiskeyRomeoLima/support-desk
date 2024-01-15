const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)//colors enables using the .cyan
    } catch(error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB