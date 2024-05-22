const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/users.model')

async function login(req, res) {
    try {
        const username = req.body.username
        const password = req.body.password
        const user = await userModel.findOne({ username })

        if (!user) return res.status(400).json({ message: 'Invalid user name' })
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) { return res.status(404).send("invalid credentials") }

        const payload = user.username + user.password
        const token = await jwt.sign(payload, process.env.SECRET_KEY)
        if (token) return res.send(token)
        else res.send("token cannot be created")

    }
    catch (err) {
        res.status(404).send("error logging in")
    }


}

async function signup(req, res) {
    try {
        const { username } = req.body.username
        if (!userModel.findOne({ username })) {
            return res.send("Username already exists")
        }
        const pass = bcrypt.hash(user.password, 10)
        const user = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: pass,
            bio: req.body.bio,
            avatar: req.body.avatar,
        })
        if (!user) { res.status('404').send('cannot create') }
        else {
            const payload = user.username + user.password
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                res.status(200).send(token)
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { login, signup } 