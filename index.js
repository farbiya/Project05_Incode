const express = require("express");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const path = require('path');
const config = require("./config/config");
const routesManager = require("./routes");

const db = mysql.createConnection(config);

db.connect(async function (err) {
  if (err) {
    throw "App could not connect to the DB. Stopping...";
  }

  const app = express();

  // Register middlewares
  app.use(cookieParser(""));
  app.use(express.static(path.join(__dirname ,'public')));
  app.use(express.urlencoded({extended: false
  }));

  app.use(function(req, res, next) {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];

    // Inject the user to the request
    req.user = authToken;

    req.con = db
    next()
  })

  //Template engine
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");


  // app.use(getSessionUser);

  // Register routes
  routesManager(app);

  app.listen(process.env.PORT || 3000);
});
