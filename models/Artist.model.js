const mongoose = require("mongoose");

// el esquema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  awardsWon: {
    type: Number,
    min: 0,
    default: 0
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "alternative", "punk", "salsa", "techno"]
  }
})


// el modelo: ES LA HERRAMIENTA QUE NOS PERMITE IR A LA COLLECCION ESPECIFICA PARA HACER BUSQUEDAS O MODIFICACIONES.
const Artist = mongoose.model("Artist", artistSchema)
// argumento 1: el nombre interno con el que se conoce el modelo, SIEMPRE SINGULAR
// argumento 2: el esquema

module.exports = Artist