module.exports = {
    getUserDetails: (con, parameter, callback) => {        
       return con.query('INSERT INTO users SET ?', parameter, callback)
    }
}