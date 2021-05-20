const { requireAuth} = require("../controllers/auth");
const {getRatings}  = require("../model/ratings")
const ratingController = require('../controllers/ratingController');
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
const axios = require("axios")
const movieUrl = "http://api.tvmaze.com/shows"




module.exports = (app) => {
  app.get("/", async (req, res) => {

    const response = await axios.get(movieUrl)

    const movies = response.data.slice(0,20)
    await Promise.all(  movies.map(async (movie) => {
      const rating = await getRatings(req.con, movie.id)

      if(rating){
        movie.rating = rating['rating'] || 0
        movie.ratingCount = rating['count']
      }
    }))



    res.render("index", { movies })

  });



  app.get("/login", loginController.index);

  app.post("/login", loginController.getUser);

  app.get("/logout", (req, res) => {
    // do something with our tokens

    res.clearCookie("AuthToken")
    res.redirect("/login");
  });
  app.get("/shows/:id",  ratingController.getMovieDetails);
  app.post("/shows/:id", requireAuth, ratingController.rateMovie);
  app.get("/signup", signupController.index);
  app.post("/signup", signupController.getUserDetails);




};
