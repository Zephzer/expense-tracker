const Record = require('../record')
const bcrypt = require('bcryptjs')
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const db = require('../../config/mongoose')

const records = [
    {
        name: '早餐',
        date: '2020/04/06',
        amount: 100,
        category: '餐飲食品'
    },
    {
        name: '加油',
        date: '2020/04/20',
        amount: 100,
        category: '交通出行'
    },
    {
        name: '看電影',
        date: '2020/05/20',
        amount: 120,
        category: '休閒娛樂'
    },
    {
        name: '房租',
        date: '2020/05/01',
        amount: 10000,
        category: '家居物業'
    },
    {
        name: '其他',
        date: '2020/05/01',
        amount: 100000,
        category: '其他'
    }
]

const SEED_USER = {
    name: 'seed',
    email: 'seed@seed',
    password: '123456',
}

db.once('open', async () => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(SEED_USER.password, salt)
        const user = await User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
        })
        const userId = user._id
        await Promise.all(records.map(async (record) => {
            record.userId = userId
            await Record.create(record)
        }))
        console.log('done')
        process.exit()
    }
    catch(err) {
        console.log(err)
    }
})