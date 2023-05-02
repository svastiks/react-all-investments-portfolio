const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://svastiksharma:testing123@cluster0.fqq0wae.mongodb.net/test')
    .then(() => {
        console.log('DB connected')
    }).catch(() => {
        console.log('Failed');
    })

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection