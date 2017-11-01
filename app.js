/**
 * Module Dependencies
 */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
const session = require('express-session')

const apiRoutes = require('./routes/api')
const app = express()

app.set('port', process.env.PORT || 8080)

dotenv.load({ path: '.env.example' })

/**
 * Connect to MongoDB
 */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGOLAB_URI)
mongoose.connection.on('error', () => {
    console.error('MongoDb connection error. Please make sure MongoDb is runnning.')
    process.exit()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.use('/api', apiRoutes)
app.listen(app.get('port'), () => {
  console.log('App is running on %d', app.get('port'))
  console.log('Press CTRL-C to stop\n')
})

module.exports = app