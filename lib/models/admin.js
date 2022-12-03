const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        index: true
    },
    token: {
        type: String
    }
})

module.exports = mongoose.models.admin || mongoose.model("admin", adminSchema)