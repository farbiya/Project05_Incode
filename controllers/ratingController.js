const Ratings = require("../model/ratings")
const jwt = require("jsonwebtoken")
const config = require("../config/auth")
const axios = require("axios")
const movieUrl = "http://api.tvmaze.com/shows"
module.exports = {
 rateMovie: (req, res) => {
     const authToken = req.cookies['AuthToken'];
     let user
     if(authToken)
         user = jwt.verify(authToken, config.secret)
     else
         return false

     let params = {}
     params.rating = req.body.rating
     params.movie_id = req.params.id
     params.user_id = user.id

     Ratings.getRatingByUser(req.con, params, async (err, rows) => {
         if(rows?.length === 0) {
             await Ratings.postRatings(req.con, params, (err, rows)=>{
                 res.send("success")
             })
         } else {
             res.send("error")
         }

     })


 },
    getMovieDetails: async(req,res)=> {
        try {

            const id = req.params.id

            const url= movieUrl+"/"+id
            const response = await axios.get(url)

            const movieDetails = response.data

            const rating = await Ratings.getRatings(req.con, movieDetails.id)
            if(rating) {
                movieDetails.rating = rating['rating'] || 0
                movieDetails.ratingCount = rating['count']
            }

            res.render("movieDetails", { movieDetails })
        }
        catch (e) {

            console.log('Error  ', e.message)
        }
    }
}