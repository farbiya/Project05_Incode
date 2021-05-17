const jwt = require("jsonwebtoken")
const config = require("../config/auth")

module.exports = {

  requireAuth: (req, res, next) => {
    const authToken = req.cookies['AuthToken'];
    if(authToken){
      const user = jwt.verify(authToken, config.secret)
      if(user.id)
        next()
      else
        res.redirect("/")
    }
    else
      res.redirect("/")
  },
};
