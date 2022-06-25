// Require related packages
const Category = require('../category')
const categoryList = require('./categories.json').results
// Require mongoose
const mongoose = require('mongoose')

// Create variable
const MONGODB_URI = process.env.DB_CONNECT

// Connect to database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Get connection status
const db = mongoose.connection
// Error
db.on('error', () => console.log('mongodb error!'))

// Success
db.once('open', () => {
    console.log('mongodb connected!');
    const categories = []
    categoryList.forEach(category => {
        categories.push(category)
    })
    Category.create(categories)
        .then(() => {
            console.log('insert data done...')
            return db.close()
        })
        .then(() => console.log('database connection close'))
})