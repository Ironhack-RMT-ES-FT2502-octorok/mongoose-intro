const express = require("express")
const router = express.Router()

const Song = require("../models/Song.model.js")

// Ruta de crear canciones
router.post("/", async (req, res) => {

  try {

    await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artist: req.body.artist
    })

    res.sendStatus(201)

  } catch (error) {
    console.log(error)
  }

})

// Ruta de ver canciones
router.get("/", async (req, res, next) => {

  try {
    // const response = await Song.find().populate("artist", "name")
    const response = await Song.find().populate({
      path: "artist", // al populate no le importa si es un id o un array de ids
      select: { name: 1, isTouring: 1, favOtherArtist: 1 },
      // ... podemos aplicar otras propiedades como sort, limit skip (si la propiedad fuese un array de ids)
      populate: {
        path: "favOtherArtist",
        model: "Artist"
      }
    })
    // .populate("scenario") // me daria toda la info tambien de la otra relacion.

    res.status(200).json(response)

  } catch (error) {
    next(error) // nos envia al gestor de errores 500
  }

})

module.exports = router