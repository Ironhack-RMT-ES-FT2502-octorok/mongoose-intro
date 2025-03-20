// Controlador de Rutas

const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
  res.status(418).json({ message: "all good here!" })
})

// ruta de prueba para aprender body/params/query
router.get("/test/:movieId", (req, res) => {

  // como el servidor puede acceder a ese valor dinamico?
  console.log(req.params)

  // como el servidor puede acceder a valores dinamicos de query?
  console.log(req.query)

  // como el servidor puede acceder a la data del body?
  console.log(req.body)

  res.sendStatus(200) // SOLO enviamos el codigo de status sin ningun valor
})

const artistRouter = require("./artist.routes.js")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes.js")
router.use("/song", songRouter)


module.exports = router