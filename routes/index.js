const { requireAuth, setAuthToken, unsetAuthToken } = require("../controllers/auth");
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
const axios = require("axios")
const movieUrl = "http://api.tvmaze.com/shows"

module.exports = (app) => {
  app.get("/", async (req, res) => {
    // const searchQuery = req.query.search
    // const searchResponse= await axios.get("http://api.tvmaze.com/search/shows?q="+searchQuery)
    const response = await axios.get(movieUrl)
    const movies = response.data.slice(0,20)
    //
    res.render("index", { movies })

  });
  app.get("/shows/:id", requireAuth, async (req, res) => {
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

  app.get("/signup", signupController.index);
  app.post("/signup", signupController.getUserDetails);




};
