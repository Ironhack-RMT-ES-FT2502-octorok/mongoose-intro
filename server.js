process.loadEnvFile()

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/artists-db")
.then(() => {
  console.log("Conectados a la DB")
})
.catch((error) => {
  console.log(error)
})

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

// ruta de prueba para aprender body/params/query
app.get("/test/:movieId", (req, res) => {

  // como el servidor puede acceder a ese valor dinamico?
  console.log(req.params)

  // como el servidor puede acceder a valores dinamicos de query?
  console.log(req.query)

  // como el servidor puede acceder a la data del body?
  console.log(req.body)

  res.json("todo bien")
})

// Hacemos rutas de CRUD para artistas
const Artist = require("./models/Artist.model.js")

app.post("/artist", (req, res) => {

  // como Postman deberia pasar la data del nuevo artista = En el body de la llamada

  // como el server accede a la data del nuevo artista a crear
  console.log(req.body)

  // como el server contacta a la DB para crear el artista
  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.json("todo bien, probando ruta de crear artista")
  })
  .catch((error) => {
    console.log(error)
  })

  Artist.fi

})

app.get("/artist", (req, res) => {

  Artist.find()
  .select({name: 1, awardsWon: 1}) // solo dame estas dos propiedades
  .sort({name: 1}) // ordenar alfabeticamente por nombre
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

app.get("/artist/search", (req, res) => {

  console.log(req.query)

  Artist.find( req.query ) // coje el query dinamico del cliente y lo usa para filtrar en la DB
  .select({name: 1, awardsWon: 1}) // solo dame estas dos propiedades
  .sort({name: 1}) // ordenar alfabeticamente por nombre
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// Ruta de buscar detalles de un artista //! TAREA

// Ruta de borrar artista
app.delete("/artist/:artistId", (req, res) => {

  Artist.findByIdAndDelete( req.params.artistId )
  .then(() => {
    res.json("todo ok, documento borrado")
  })
  .catch((error) => {
    console.log(error)
  })

})

// Ruta de editar artista
app.put("/artist/:artistId", async (req, res) => {

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

    res.json(response) // el cliente quiere el documento modificado
    
  } catch (error) {
    console.log(error)
  }

})

// PATCH
app.patch("/artist/:artistId/add-genre/:genreName", async (req, res) => {
  console.log(req.params)
  try {
    
    // await Artist.findByIdAndUpdate(req.params.artistId, {
    //   $inc: { awardsWon: 1 } // incremente la propiedad en 1
    // })
    await Artist.findByIdAndUpdate(req.params.artistId, {
      $push: { genre: req.params.genreName } // añadir una nueva propiedad a un array
    })

    res.json("todo bien, ahora el artista tiene un premio más")

  } catch (error) {
    console.log(error)
  }

})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
