const express = require('express')
const collection = require("./mongodb")
const cors = require('cors')
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())

server.get("/login", cors(), (req, res) => {

})

server.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {

        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("Email already exists!")
        }
        else {
            res.json("Email does not already exist")
        }

    }
    catch (e) {
        res.json("Does not exist.")
    }
})

server.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password
    }

    try {

        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("Exists")
        }
        else {
            res.json("Does not exist")

            await collection.insertMany([data])
        }

    }
    catch (e) {
        res.json("Does not exist")
    }
})

server.listen(3000, () => {
    console.log('Port is connected')
})
