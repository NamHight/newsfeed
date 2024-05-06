
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

    latestNews = async () => {
        let sql = `SELECT * FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id`;
        let result = await query(sql)
        console.log(result);
        return result;
    }

    latestPost = async () => {
        let sql = `SELECT * FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id order by createAt desc LIMIT 5`;
        let result = await query(sql)
        console.log(result);
        return result;
    }

    postNews = async () => {
        let sql = `SELECT * FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id order by view desc Limit 3`;
        console.log(await query(sql))
        return await query(sql);
    }

    mostviews = async () => {
        let sql = `SELECT * FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id order by view desc Limit 5`;
        console.log(await query(sql))
        return await query(sql);
    }

    dmBaiViet = async (params) => {
        let sql = `SELECT * FROM ${this.tableName} inner join ${this.tableJoin} on ${this.tableName}.catetory=${this.tableJoin}.Id 
        inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id`;
        sql += ` WHERE name = '${params}' order by view desc Limit 4`;
        console.log("sqldmBaiViet: " + await query(sql));
        return await query(sql);
    } 

    dmMostViews = async (params) => {
        let sql = `SELECT * FROM ${this.tableName} inner join ${this.tableJoin} on ${this.tableName}.catetory=${this.tableJoin}.Id 
        inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id`;
        sql += ` WHERE name = '${params}' order by  view desc Limit 1`;
        console.log("sqldmMostViews: " + await query(sql));
        return await query(sql);
    } 
    Photography = async () => {
        let sql = `SELECT * FROM ${this.tableImage} inner join ${this.tableName}
        on ${this.tableImage}.Idpost= ${this.tableName}.Id limit 6`;
        console.log("sqlPhotography: " + await query(sql));
        return await query(sql);
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