const express = require('express')
const app = express()
const exhbs =require('express-handlebars')
const port = 3000

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})