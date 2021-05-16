const Login = require("../model/login")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const config = require("../config/auth")

module.exports = {

    index: (req, res) => {
        res.render("login", {title: "Login"})
    },

    getUser: (req, res) => {
        let {email, password} = req.body

        if (!email || !password)
            return false
        password = crypto.createHash('sha256').update(password).digest('hex')
        Login.getUser(req.con, [email, password], (err, rows) => {

            if (rows?.length > 0) {
                let token = jwt.sign({id: rows[0].id}, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                res.cookie('AuthToken', token);
                res.redirect('/')
            } else
                res.render("login", {error: "Invalid login cresentials"})
        })


    },


}