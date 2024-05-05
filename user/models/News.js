
const  { multipleColumnSet,multipleColumnSearch } = require("../helpers/commom.ulti");
const query = require("../db/connection");

class News{
    tableName = 'baiviet';
    tableJoin = 'dmbaiviet';
    tableImage = 'imagepost';
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

    search = async (params = {},page,perpage,sort) => {
        let sql = `SELECT a.id,a.title,a.description,a.author,c.fileName,a.view,b.name,a.createAt,a.status FROM ${this.tableName} a 
                           inner join ${this.tableJoin} b on a.catetory = b.Id inner join ${this.tableImage} c on a.id = c.idpost `;

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSearch(params); // {id : 1}
        sql += ` WHERE ${columnSet} limit ${perpage} offset ${page} `;
        if(sort){
            sql += ` ORDER BY ${sort}`
        }
        // select * from table where id = 1
        console.log("sql: " + sql);
        return await query(sql, [...values]);
    }

    searchAndFilter = async (params = {},page,perpage,sort) => {
        let sql = `SELECT a.id,a.title,a.description,a.author,c.fileName,a.view,b.name,a.createAt,a.status FROM ${this.tableName} a 
                           inner join ${this.tableJoin} b on a.catetory = b.Id inner join ${this.tableImage} c on a.id = c.idpost `;

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSearch(params); // {id : 1}
        sql += ` WHERE ${columnSet} ORDER BY ${sort} limit ${perpage} offset ${page} `;
        // select * from table where id = 1
        console.log("sql: " + sql);
        return await query(sql, [...values]);
    }

    count = async (params) =>{
        const { columnSet, values } = multipleColumnSearch(params);
        let sql = `SELECT COUNT(*) AS allcount FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        sql += ` WHERE ${columnSet} `;
        const result = await query(sql, [...values]);

        return result[0].allcount;
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
    selectTitle = async (params = {}) => {
        let sql = `SELECT Title FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
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