const { requireAuth, setAuthToken, unsetAuthToken } = require("../controllers/auth");
const loginController = require('../controllers/loginController');

const axios = require("axios")
const movieUrl = "http://api.tvmaze.com/shows"

module.exports = (app) => {
  app.get("/", async (req, res) => {

    const response = await axios.get(movieUrl)
    const movies = response.data.slice(0,20)
    res.render("index", { movies })

  });
  app.get("/shows/:id", async (req, res) => {
    try {

      const id = req.params.id

      const url= "http://api.tvmaze.com/shows/"+id
      console.log(url)
      const response = await axios.get(url)
      console.log(response)
      const movieDetails = response.data
      console.log(movieDetails)
      res.render("movieDetails", { movieDetails })
    }
    catch (e) {

      console.log('Error  ', e.message)
    }
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.post("/login", loginController.getUser);

  app.get("/logout", (req, res) => {
    // do something with our tokens
    res.redirect("/login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.post("/signup", (req, res) => {
    // if reg is valid, show a message and redirect to login
  });




};
