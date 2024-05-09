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

    findOneStatus = async (params) => {
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

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE Id = ?`;
        console.log(id)
        const result = await query(sql, [...values, id]);

        return result;
    }
}

module.exports = new Comments();