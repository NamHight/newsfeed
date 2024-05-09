
const  { multipleColumnSet } = require("../helpers/commom.ulti");
const query = require("../db/connection");

class Contact{
    tableName = 'contact';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }
    findDesc = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} ORDER BY createAt DESC`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        console.log(sql)
        // select * from table where id = 1
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // Hàm này trả ve news dau tien
        return result[0];
    }
    findOneTitle = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT title FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values],()=>{

        });

        // Hàm này trả ve news dau tien
        return result[0];

    }
    //data la doi tuong can truyen tham so mapping qua database
    create = async (data ) => {
        // day la vi du
        const sql = `INSERT INTO ${this.tableName}
        (name,email,tel,title,content,createAt) VALUES (?,?,?,?,?,?)`;
        const result = await query(sql, [data.name,data.email,data.phone,data.title,data.content,data.createAt]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new Contact();