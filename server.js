const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require('cors')


// Load env variables
dotenv.config({ path: './config/config.env'})
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Route files
const users = require('./routes/users_route')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Mount routes
app.use('/api/v1/users', users)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.gray.underline)
})