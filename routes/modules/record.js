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

router.get('/:id/edit', async (req, res) => {
    try {
        const _id = req.params.id
        const record = await Record.findOne({ _id }).lean()
        res.render('edit', { record })
    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const info = req.body
        await Record.updateOne({ _id }, info)
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id/delete', async (req, res) => {
    try {
        const _id = req.params.id
        const record = await Record.findOne({ _id }).lean()
        const category = await Category.findOne({ categoryName: record.category }).lean()
        record.image = category.image
        res.render('delete', { record })
    } catch (error) {
        console.error(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const record = await Record.findOne({ _id })
        if (record) {
            await record.remove()
        }
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router