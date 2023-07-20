const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')
const categories = [
    {
        categoryName: '交通出行',
        image: 'fa-solid fa-van-shuttle fa-2xl'
    },
    {
        categoryName: '家居物業',
        image: 'fa-solid fa-house fa-2xl'
    },
    {
        categoryName: '休閒娛樂',
        image: 'fa-solid fa-face-grin-beam fa-2xl'
    },
    {
        categoryName: '餐飲食品',
        image: 'fa-solid fa-utensils fa-2xl'
    },
    {
        categoryName: '其他',
        image: 'fa-solid fa-pen fa-2xl'
    }
]

db.once('open', async () => {
    try {
        await Category.create(categories)
        console.log('done')
        process.exit()
    } 
    catch (error) {
        console.error(error.message)
    }  
})