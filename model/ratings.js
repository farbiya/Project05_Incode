module.exports = {
    getRatings: async (con, movieId = 1) => {

        return new Promise((resolve, reject) => {
            con.query('SELECT count(`user_id`) as `count`,  AVG(rating) as `rating` FROM ratings WHERE movie_id=?', movieId, (err, results) => {
                if (err) {
                    throw err;
                }
                resolve(results[0]);
            });

        })
    },
    postRatings:(con, parameter, callback) => {
        return con.query('INSERT INTO ratings SET ?', parameter, callback)
    },
    getRatingByUser:(con, parameter, callback) => {
        con.query(`SELECT * FROM ratings WHERE user_id = ${parameter.user_id} AND movie_id = ${parameter.movie_id}`, parameter, callback)
    }
}