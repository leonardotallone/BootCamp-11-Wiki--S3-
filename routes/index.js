const express = require ('express')
const routes = express.Router()
const routesUsers = require ("./Users") // el primer parametro es un PATH
const routesPages = require ("./Pages")

routes.use("/pages", routesPages) // el primer parametro es un URL
routes.use("/users", routesUsers)

module.exports = routes
