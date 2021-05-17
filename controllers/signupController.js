const Signup = require("../model/signup")
const crypto = require("crypto")

module.exports = {
    index:  (req, res) => {
        res.render("signup", { title: "Signup" })
    },
    getUserDetails: (req, res) => {
        if (req.body.username &&
            req.body.email &&
            req.body.password &&
            req.body.confirmPassword) {
            // Confirm user entered two matching passwords
            if (req.body.password !== req.body.confirmPassword) {
                var err = new Error('Both passwords must match.')
                err.status = 400
                return next(err)
            } else {

                const userData = req.body;
                delete userData['confirmPassword']

                userData.password=crypto.createHash('sha256').update(userData.password).digest('hex');
                Signup.getUserDetails(req.con, userData, (error, rows) => {
                    if (error) {
                        if (error.code === "ER_DUP_ENTRY")
                            res.render('signup', { title: 'Sign Up', error: 'Email is taken' });
                        else
                            return next(error)
                    } else {

                        return res.redirect('/login')
                    }
                })
            }
        } else {
            var err = new Error('All fields are required.')
            err.status = 400
            return next(err)
        }
    }



}