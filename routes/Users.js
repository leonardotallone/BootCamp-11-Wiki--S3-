const express = require ('express')
const userRoutes = express.Router()
const { Pages, Users } = require ("../models")


// Busca todos los usuarios...
userRoutes.get("/", (req, res, next) => {
    Users.findAll()
      .then((users) => res.send(users))
      .catch(next);
  });

 // busca todas las paginas asociadas al usuario... 
userRoutes.get("/:id", (req, res, next) => {
    Pages.findAll({
      where: {
        authorId: req.params.id,
      },
    })
      .then(function (page) {
        res.send(page);
      })
      .catch(next);
  });



module.exports = userRoutes;