const  { multipleColumnSet } = require("../helpers/commom.ulti");
const query = require("../db/connection");
class Comments{
    tableName = 'comment';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }

    create = async (data ) => {
        // day la vi du
        const sql = `INSERT INTO ${this.tableName}
        (Content, IdPost, Status, CreateAt) VALUES (?,?,?,?)`;
        if(data === undefined){
            console.log("chua co du lieu");
        }
        console.log("doi tuong la", data)
        const result = await query(sql, [data.Content,data.IdPost,data.Status,data.CreateAt]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("show ket qua",affectedRows)
        return affectedRows;
    }
}

module.exports = new Comments();