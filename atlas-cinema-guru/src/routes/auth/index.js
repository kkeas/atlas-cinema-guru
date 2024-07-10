const express = require('express')
const router = express.Router()
const registerRouter = require('./Register')
const loginRouter = require('./Login')
const { verifyToken } = require('../../../utils/tokens')

router.use('/register', registerRouter)
router.use('/login', loginRouter)

router.post('/', verifyToken, (req, res) => {
    if (req.userId && req.username) {
        res.send({
            userId: req.userId,
            username: req.username,
        })
    } else {
        res.status(401).send({
            message: "Invalid token"
        })
    }
})

module.exports = router
