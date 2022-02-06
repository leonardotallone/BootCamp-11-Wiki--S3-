const express = require("express");
const { Pages, Users } = require("../models");
const pagesRoute = express.Router();

pagesRoute.get("/", (req, res, next) => {
  Pages.findAll()
    .then((pages) => res.send(pages))
    .catch(next);
});

// pagesRoute.post("/", function (req, res, next) {
//   console.log("funcionó GET /api/pages/");
//   res.send("funcionó POST /pages/");
// });

pagesRoute.post("/", (req, res, next) => {
  // Agregá definiciones para  `title` y `content`
  const { name, email } = req.body;
  Users.findOrCreate({
    where: { name, email },
  })
    .then((data) => {
      const user = data[0]; // 0 es el ID en la tabla.
      Pages.create({
        title: req.body.title,
        urlTitle: generateUrlTitle(req.body.title),
        content: req.body.content,
        tags: req.body.tags,
      })
        .then((page) => page.setAuthor(user))
        .then((page) => res.send(page));
    })
    .catch(next);
});

function generateUrlTitle(title) {
  // Remueve todos los caracteres que no son alfanuméricos,  y convierte los espacios en guiones bajos.
  if (title) {
    return title.replace(/\s+/g, "_").replace(/\W/g, "");
  } else {
    return Math.random().toString(36).substring(2, 7); // Genera de forma aleatoria un String de 5 caracteres
  }
}

// Detail Page Route
pagesRoute.get("/:urlTitle", (req, res, next) => {
  Pages.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    },
    include: { model: Users, as: "author" },
  })
    .then(function (page) {
      res.send(page);
    })
    .catch(next);
});

pagesRoute.delete("/:id", (req, res, next) => {
  Pages.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((pages) => res.status(204).send(pages))
    .catch(next);
});

pagesRoute.put("/:urlTitle", (req, res, next) => {
  Pages.update(
    { content: req.body.content, title: req.body.title },
    {
      where: {
        urlTitle: req.params.urlTitle,
      },
    }
  )
    .then((pages) => res.status(201).send(pages))
    .catch(next);
});

// esto busca por TAG
pagesRoute.get("/search/:tag", (req, res, next) => {
  Pages.findByTag(req.params.tag)
    //   .then(function (pages) {})
    .then((pages) => res.send(pages))
    .catch(next);
});

// Esto busca por Similar TAG
pagesRoute.get("/:urlTitle/similar", (req, res, next) => {
  Pages.findOne({ where: { urlTitle: req.params.urlTitle } })
    .then(function (page) {
      if (!page) next("No se encontró tu página");
      return page.findSimilar();
    })
    .then(function (similarPages) {
      return res.send(similarPages);
    })
    .catch(next);
});

module.exports = pagesRoute;
