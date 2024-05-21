const express = require('express')
const routes = express.Router()
const categoryMethods = require('../controllers/category.controller')

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))

routes.get('/', categoryMethods.getAllCategories)
routes.post('/', categoryMethods.createCategory)

module.exports = routes