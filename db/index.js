const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Conectados a la DB")
})
.catch((error) => {
  console.log(error)
})