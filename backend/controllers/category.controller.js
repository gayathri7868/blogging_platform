const categoryModel = require('../models/category.model')

async function getAllCategories(req, res) {

    try {
        const categories = await categoryModel.find()
        if (categories) {
            res.status(200).send(categories)
        }
        else {
            res.status(404).send("no category")
        }
    }
    catch (err) {

        res.status(404).send("Cannot display category details ")
    }


}
async function createCategory(req, res) {
    try {
        const category = await categoryModel.create({
            name: req.body.name
        })
        if (!category) { res.status('404').send('cannot create') }
        else {
            res.status(200).send(category)
        }
    }

    catch (err) {
        res.send("error")
    }
}

categoryMethods = { createCategory, getAllCategories }
module.exports = categoryMethods
