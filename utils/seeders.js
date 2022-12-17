const adminModal = require('../lib/models/admin')
const categoriesModal = require('../lib/models/Category')

exports.seedAdmin = () => {
    const admin = { firstName: 'Admin', lastName: 'Admin', email: "admin@gmail.com", password: "admin123" }

    adminModal.countDocuments({}, function (err, count) {
        console.log('Number of Admin:', count)
        if (count === 0) {
            console.log('Admin Created successfuly');
            adminModal.create(admin, function (error, docs) {
                console.log(error, docs)
            })
        }
    })
}

exports.seedCategories = () => {
    const categories = [{ name: 'Mobile' }, { name: "Lcd" }]
    categoriesModal.countDocuments({}, function (err, count) {
        console.log('Number of Categories:', count)
        if (count === 0) {
            console.log('Categories Created successfuly');
            categoriesModal.insertMany(categories, function (error, docs) {
                console.log(error, docs)
            })
        }
    })
}
