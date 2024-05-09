
const  { multipleColumnSet } = require("../helpers/commom.ulti");
const query = require("../db/connection");
const catetory = require("./DMNews")

class News{
    tableName = 'baiviet';

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

    findNumRow = async () => { // tim so dong cua bang bai viet
        let sql = `SELECT count(*) as 'numRow' FROM ${this.tableName}`;
        let numRow = await query(sql);
        console.log("NumRow: ", numRow);
        return numRow[0] // la 1 object 
    }


    findOfPage = async (params) => { // lay ra nhung bai viet cua tung trang tuong ung
        let sql = `SELECT * FROM ${this.tableName} limit 10 offset ${params}`;
        return await query(sql);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // Hàm này trả ve news dau tien
        return result[0];
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // Hàm này trả ve news dau tien
        return result[0];
    }
    
    findByView = async () => { // ham tim kiem bai viet theo view giam dan
        const sql = `SELECT * FROM ${this.tableName} order by  view desc`;
        const result = await query(sql);
        // Hàm này trả ve news dau tien
        return result;
    }

    findByTime = async () => { // ham tim kiem bai viet theo view giam dan
        const sql = `SELECT * FROM ${this.tableName} order by createAt desc`;
        const result = await query(sql);
        // Hàm này trả ve news dau tien
        return result;
    } 

    findOneStatus = async (params) => {
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
    create = async (data ) => {
        // day la vi du
        const sql = `INSERT INTO ${this.tableName}
        (title, description, author, view, catetory, createAt,image, status) VALUES (?,?,?,?,?,?,?,?)`;
        if(data === undefined){
            console.log("chua co du lieu");
        }
        console.log("doi tuong la", data)
        const result = await query(sql, [data.title,data.description,data.author,data.view,data.catetory,data.createAt,data.image,data.status]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("show ket qua",affectedRows)
        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE Id = ?`;
        console.log(id)
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