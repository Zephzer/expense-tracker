const express = require('express')
const router = express.Router()


router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    console.log(req.body)
    // console.log(selectValue)
})

module.exports = router