const express = require('express')

const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
    try {
        const userId = req.user._id
        let totalAmount = 0
        const records = await Record.find({ userId }).lean().sort({ date: 'desc' })
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

router.get('/search', async (req, res) => {
    try {
        const userId = req.user._id
        const keyword = req.query.keyword
        let totalAmount = 0
        const records = await Record.find({ userId, category: keyword }).lean().sort({ date: 'desc' })
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