const dotenv = require('dotenv');
dotenv.config();
const sql = require('mysql2')

class DBConnection {
    constructor() {
        this.db = sql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        });
        this.checkConnection();
    }


    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database kết nối đã đóng.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database quá nhiều kết nối.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database kết nối bị từ chối.');
                }

            }
            if (connection) {
                connection.release();
            }
            return;
        });
    }
    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;