const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.SERVER_PORT


/*

Node JS is a fast JavaScript runtime environment that we use to 
build server-side applications, but it does not know how to 
perform serving files, handling requests, and handling HTTP methods, so 
this is where express js comes in.

Express is a node js web application framework that 
provides broad features for building web and mobile applications. 
It is used to build a single page, multipage, and hybrid web application.
It's a layer built on the top of the Node js that helps manage servers and routes.
*/
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Support Desk API'})
})

//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
