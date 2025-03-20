function handleErrors(app) {

  // errores de 404
  app.use((req, res) => {
    res.status(404).json({errorMessage: "No existe la ruta indicada"})
  })
  
  // errores de 500
  app.use((error, req, res, next) => {
    // si esta funcion recibe 4 parametros, entonces es el gestor de errores 500
    console.log(error)
    res.status(500).json({errorMessage: "error de servidor"})
  })
}

module.exports = handleErrors