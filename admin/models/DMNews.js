const  { multipleColumnSet } = require("../helpers/commom.ulti");
const query = require("../db/connection");
class Catetory{
    tableName = 'dmbaiviet';

    findOneID = async (params) => { // select Id from dmbaiviet =>lấy dòng đầu tiên
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT Id FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // Hàm này trả ve news dau tien
        return result[0];
    }

    find = async (params = {}) => { // select * from dmbaiviet
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: ",sql);
        return await query(sql, [...values]);
    }

    findOne = async (params) => { // select * from dmbaiviet => lấy dòng đầu tiên 
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        console.log(sql)
        const result = await query(sql, [...values]);

        // Hàm này trả ve news dau tien
        return result[0];
    }

    findOneField = async (params) => { // select status from dmbaiviet => lấy dòng đầu tiên
        console.log('vao day')
        // params cần chuyền vô 1 là đối tượng gồm key và values ví dụ Id: 6
        const { columnSet, values } = multipleColumnSet(params)
        // Tách ra được columnSet = 'Id=?' và values = 6
        const sql = `SELECT status FROM ${this.tableName}
        WHERE ${columnSet}`;
        // Lúc này câu lệnh truy vấn là: select Status from baiviet where Id=?
        const result = await query(sql, [...values],()=>{
            
        });
        // Hàm này trả ve news dau tien
        return result[0];
    }

    //data la doi tuong can truyen tham so mapping qua database
    create = async (data ) => { // inser into dmbaiviet values (?,?,?)
        // day la vi du
        const sql = `INSERT INTO ${this.tableName}(name,status) VALUES (?,?)`;
        if(data === undefined){
            console.log("chua co du lieu");
        }
        const result = await query(sql, [data.name ,data.status]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("show ket qua",affectedRows)
        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE Id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE Id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
}


module.exports = new Catetory();