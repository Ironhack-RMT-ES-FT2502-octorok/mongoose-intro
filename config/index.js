const express = require("express");

const logger = require("morgan");
const cors = require("cors");
// all middlewares & configurations here

function config(app) {

  app.use(logger("dev"));
  app.use(express.static("public"));

  // to allow CORS access from anywhere
  app.use(cors({
    origin: process.env.ORIGIN
  }));

  // below two configurations will help express routes at correctly receiving data. 
  app.use(express.json()); // recognize an incoming Request Object as a JSON Object
  app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


}

module.exports = config
