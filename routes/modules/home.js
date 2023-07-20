const express = require('express')

const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
let totalAmount = 0

router.get('/', async (req, res) => {
    try {
        const records = await Record.find().lean().sort({ date: 'desc' })
        console.log(records)
        await Promise.all(
            records.map(async (record) => {
                const category = await Category.find({ categoryName: record.category }).lean()
                record.image = category[0].image
                const amount = record.amount
                totalAmount += amount
            })
        )
        res.render('index', { records, totalAmount })
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router