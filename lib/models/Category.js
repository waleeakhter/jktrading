const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        index: true
    }
})

module.exports = mongoose.models.Category || mongoose.model("Category", CategorySchema)