const express = require("express")
const router = express.Router()

const Artist = require("../models/Artist.model.js")
// Hacemos rutas de CRUD para artistas

router.post("/", (req, res) => {

  // como Postman deberia pasar la data del nuevo artista = En el body de la llamada

  // como el server accede a la data del nuevo artista a crear
  console.log(req.body)

  // como el server contacta a la DB para crear el artista
  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
    favOtherArtist: req.body.favOtherArtist
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch((error) => {
    console.log(error)
  })

})

router.get("/", (req, res) => {

  Artist.find( req.query )
  .select({name: 1, awardsWon: 1}) // solo dame estas dos propiedades
  .sort({name: 1}) // ordenar alfabeticamente por nombre
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// Ruta de borrar artista
router.delete("/:artistId", (req, res) => {

  Artist.findByIdAndDelete( req.params.artistId )
  .then(() => {
    res.sendStatus(202)
  })
  .catch((error) => {
    console.log(error)
  })

})

// Ruta de editar artista
router.put("/:artistId", async (req, res) => {

  console.log(req.params)
  console.log(req.body)

  try {

    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    })
    // por alguna razon, Mongo nos devuelve el documento ANTES de las actualizaciones. 
    // TAREA: Buscar como hacer para que mongo nos devuelve el documento despues de la actualización
    // SOLUCION: Agregamos un 3rd argumento al metodo findByIdAndUpdate con el objeto { new: "true" }

    res.status(202).json(response) // el cliente quiere el documento modificado
    
  } catch (error) {
    console.log(error)
  }

})

// PATCH
router.patch("/:artistId/genre/:genreName", async (req, res) => {
  console.log(req.params)
  try {
    
    // await Artist.findByIdAndUpdate(req.params.artistId, {
    //   $inc: { awardsWon: 1 } // incremente la propiedad en 1
    // })
    await Artist.findByIdAndUpdate(req.params.artistId, {
      $push: { genre: req.params.genreName } // añadir una nueva propiedad a un array
    })

    res.sendStatus(202)

  } catch (error) {
    console.log(error)
  }

})

module.exports = router