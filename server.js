process.loadEnvFile()

require("./db")

const express = require("express");
const app = express();

const config = require("./config")
config(app)

// all routes here...
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)
// GESTOR DE ERRORES

const handleErrors = require("./errors")
handleErrors(app)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
