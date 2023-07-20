const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
    // 初始化
    app.use(passport.initialize())
    app.use(passport.session())

    // Local 驗證策略
    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ email })
        .then(user => {
            if(!user) {
                return done(null, false, req.flash('warning_msg', '這個 Email 還沒有被註冊'))
            }
            return bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return done(null, false, req.flash('warning_msg', 'Email 或 Password 不正確!'))
                }
            })
        })
        .catch(err => done(err, false))
    }))

    // 序列化、反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, false))
    })
}