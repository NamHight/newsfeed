
const  { multipleColumnSet } = require("../helpers/commom.ulti");
const query = require("../db/connection");

class News{
    tableName = 'baiviet';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} limit(11)`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
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
    findOneField = async (params) => {
        console.log('vao day')
        // params cần chuyền vô 1 là đối tượng gồm key và values ví dụ Id: 6
        const { columnSet, values } = multipleColumnSet(params)
        // Tách ra được columnSet = 'Id=?' và values = 6
        const sql = `SELECT Status FROM ${this.tableName}
        WHERE ${columnSet}`;
        // Lúc này câu lệnh truy vấn là: select Status from baiviet where Id=?
        const result = await query(sql, [...values],()=>{
            
        });
        // Hàm này trả ve news dau tien
        return result[0];

    }
    //data la doi tuong can truyen tham so mapping qua database
    create = async (data ) => {
        // day la vi du
        const sql = `INSERT INTO ${this.tableName}
        (title, description, author, view, ID_DM, createAt, status) VALUES (?,?,?,?,?,?,?)`;
        if(data === undefined){
            console.log("chua co du lieu");
        }
        const result = await query(sql, [data.title,data.description,data.author,data.view,data.id_dm,data.createAt,data.status]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("show ket qua",affectedRows)
        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

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

module.exports = new News();