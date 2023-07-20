const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', async (req, res) => {
    try {
        const { name, date, category, amount } = req.body
        const amountInt = parseInt(amount, 10)
        const record = new Record({ name, date, category, amount: amountInt })

        await record.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router