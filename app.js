const express = require('express')
const app = express()
const exhbs =require('express-handlebars')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const port = 3000

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended:true }))

app.use(routes)

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})