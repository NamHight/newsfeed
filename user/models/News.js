
const  { multipleColumnSet,multipleColumnSearch,multipleColumnSet2 } = require("../helpers/commom.ulti");
const query = require("../db/connection");

class News{
    tableName = 'baiviet';
    tableJoin = 'dmbaiviet';
    tableImage = 'imagepost';
    tableComment = 'comment';

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

    search = async (params = {},page,perpage) => {
        let sql = `SELECT a.Id,a.title,a.description,a.author,a.image ,a.view,b.name,a.createAt,a.status FROM ${this.tableName} a 
                           inner join ${this.tableJoin} b on a.catetory = b.Id `;

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSearch(params);
        sql += ` WHERE ${columnSet} limit ${perpage} offset ${page} `;
        console.log("sql: " + sql);
        return await query(sql, [...values]);
    }

    searchAndFilter = async (params = {},page,perpage,sort) => {
        let sql = `SELECT a.id,a.title,a.description,a.author,a.image ,a.view,b.name,a.createAt,a.status FROM ${this.tableName} a 
                           inner join ${this.tableJoin} b on a.catetory = b.Id `;

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

    latestNews = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableImage}.FileName FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }

    latestPost = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableImage}.FileName FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id order by createAt desc LIMIT 6`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }

    postNews = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableImage}.FileName FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id order by view desc Limit 3`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }

    mostviews = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableImage}.FileName FROM ${this.tableName} inner join ${this.tableImage} on ${this.tableImage}.Idpost = ${this.tableName}.Id order by view desc Limit 6`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    }

    Posts = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.description,${this.tableName}.view,${this.tableName}.author,
        ${this.tableName}.catetory,${this.tableName}.image,${this.tableName}.createAt, ${this.tableJoin}.name FROM ${this.tableName}
        inner join ${this.tableJoin} on ${this.tableName}.catetory=${this.tableJoin}.Id`;
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${this.tableName}.${columnSet}`;
        // select * from table where id = 
        const result = await query(sql, [...values]);
        console.log("Posts: " + result);
        return result[0];
    } 

    RelatedPost  = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.description,${this.tableName}.view,${this.tableName}.author,
        ${this.tableName}.catetory,${this.tableName}.image,${this.tableName}.createAt, ${this.tableJoin}.name  FROM ${this.tableName} inner join ${this.tableJoin} on ${this.tableName}.catetory=${this.tableJoin}.Id`;
        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${this.tableJoin}.Id in (select ${this.tableName}.catetory from ${this.tableName} where ${this.tableName}.${columnSet}) Limit 3`;
        const result = await query(sql, [...values])
        console.log("RelatedPost: " + result);
        return result;
    }

    dmBaiViet = async (params) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableImage}.FileName FROM ${this.tableName} inner join ${this.tableJoin} on ${this.tableName}.catetory=${this.tableJoin}.Id 
        inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id`;
        sql += ` WHERE name = '${params}' order by view desc Limit 4`;
        let result =  await query(sql);
        console.log("sqldmBaiViet: " + result);
        return result;
    } 

    dmMostViews = async (params) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableName}.image, ${this.tableImage}.FileName FROM ${this.tableName} inner join ${this.tableJoin} on ${this.tableName}.catetory=${this.tableJoin}.Id 
        inner join ${this.tableImage} on ${this.tableImage}.Idpost= ${this.tableName}.Id`;
        sql += ` WHERE name = '${params}' order by  view desc Limit 1`;
        let result =  await query(sql);
        console.log("sqldmMostViews: " + result);
        return result;
    } 
    
    Photography = async (params = {}) => {
        let sql = `SELECT ${this.tableName}.Id, ${this.tableName}.title,${this.tableName}.view,${this.tableName}.author,${this.tableName}.catetory,${this.tableName}.createAt,${this.tableImage}.FileName FROM ${this.tableImage} inner join ${this.tableName}
        on ${this.tableImage}.Idpost= ${this.tableName}.Id limit 6`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params); // {id : 1}
        sql += ` WHERE ${columnSet}`;
        // select * from table where id = 1
        console.log("sql: " + [columnSet] + [values]);
        return await query(sql, [...values]);
    } 

    comments = async (params = {}) => {
        let sql = `SELECT Content FROM ${this.tableComment} where Status = 1 and IdPost = ${params.id}`;
        return await query(sql);
    } 

    createComments = async (data ) => {
        const sql = `INSERT INTO ${this.tableComment}(Content, IdPost, CreateAt) VALUES (?,?,?)`;
        const result = await query(sql,[data.content, data.id, new Date()]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("affectedRows: " + affectedRows);
        return affectedRows;
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