module.exports = {
    getUser: (con, parameter, callback) => {        
       con.query('SELECT * FROM users WHERE email = ? AND password = ?', parameter, callback)
    }
}