const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/users.model')

async function login(req, res) {
    try {
        const username = req.body.username
        const password = req.body.password
        const user = await userModel.findOne({ username })

        if (!user) return res.status(400).json({ message: 'User not found' })
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) { return res.status(404).send("invalid credentials") }

        const id = user._id
        const token = jwt.sign({ id }, process.env.SECRET_KEY)
        if (token) return res.send(token)
        else res.send("token cannot be created")

    }
    catch (err) {
        res.status(404).send("error logging in")
    }


}

async function signup(req, res) {
    try {
        console.log("#$")
        const { username } = req.body.username
        if (!userModel.findOne({ username })) {
            return res.send("Username already exists")
        }
        const user = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            avatar: req.body.avatar,
        })
        if (!user) { res.status('404').send('cannot create') }
        else {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).send("error")
                }
                else {
                    user.password = hash
                    user.save()
                        .then(savedUser => {
                            console.log(savedUser._id)
                            const id = savedUser._id
                            jwt.sign({ id }, process.env.SECRET_KEY, (err, token) => {
                                res.status(200).send(token)
                                console.log(token)
                                console.log('@#')
                            })
                        }
                        )
                        .catch(err => res.status(404).send("error"))

                }
            })
        }

    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { login, signup } 