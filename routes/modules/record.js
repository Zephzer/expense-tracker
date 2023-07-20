const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// link to new page
router.get('/new', (req, res) => {
    return res.render('new')
})

// create function
router.post('/', async (req, res) => {
    try {
        const userId = req.user._id
        const { name, date, category, amount } = req.body
        const amountInt = parseInt(amount, 10)
        const record = new Record({ name, date, category, amount: amountInt, userId })

        await record.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

// link to edit
router.get('/:id/edit', async (req, res) => {
    try {
        const userId = req.user._id
        const _id = req.params.id
        const record = await Record.findOne({ _id, userId }).lean()
        res.render('edit', { record })
    } catch (err) {
        console.log(err)
    }
})

// edit function
router.put('/:id', async (req, res) => {
    try {
        const userId = req.user._id
        const _id = req.params.id
        const info = req.body
        await Record.updateOne({ _id, userId }, info)
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

// link to delete
router.get('/:id/delete', async (req, res) => {
    try {
        const userId = req.user._id
        const _id = req.params.id
        const record = await Record.findOne({ _id, userId }).lean()
        const category = await Category.findOne({ categoryName: record.category }).lean()
        record.image = category.image
        res.render('delete', { record })
    } catch (error) {
        console.error(error.message)
    }
})

// delete function
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.user._id
        const _id = req.params.id
        const record = await Record.findOne({ _id, userId })
        if (record) {
            await record.remove()
        }
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router