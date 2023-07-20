const express = require('express')
const app = express()
const exhbs =require('express-handlebars')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const port = process.env.PORT
require('./config/mongoose')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended:true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})