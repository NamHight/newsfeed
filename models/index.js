const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '',
    database : 'newsfeed'
})


module.exports = {
     list () {
        let query = `select * from baiviet`

    }
};
