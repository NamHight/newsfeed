const {multipleColumnSet, multipleColumnSet2} = require('../helpers/commom.ulti')
const query = require("../db/connection");

class NewsLetterModel {

    tableName = 'user'

    find = async (params = {}) => {
        let sql = `SELECT Id, Mail, Role, CreateAt FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
        return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: " + sql + [values]);
        return await query(sql, [...values]);

    }
}


module.exports = new NewsLetterModel();