const mongoose = require('mongoose')

const connectToDatabase = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`Database connected : ${conn.connection.host}`)
    })
    .catch((err)=>{
        console.log(`Daatabase connection failed : ${err.message}`)
    })
}

module.exports = connectToDatabase