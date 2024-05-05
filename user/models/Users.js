const  { multipleColumnSet2,multipleColumnSet } = require("../helpers/commom.ulti");
const query = require("../db/connection");

class userModels{
    tableName = 'user';

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet2(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        console.log("sqlfindOne: " + [columnSet] + [values]);
     
        const result = await query(sql, [...values],(err)=>{
            if(err)  throw err
        });
        console.table('findOne',result)
        // Hàm này trả ve news dau tien
        return result[0];
    }
    findOneRole = async (params) => {
        const { columnSet, values } = multipleColumnSet2(params)

        const sql = `SELECT Role FROM ${this.tableName} WHERE ${columnSet}`;
        console.log("sqlfindOne: " + [columnSet] + [values]);
     
        const result = await query(sql, [...values],(err)=>{
            if(err) throw err
        });
        console.table('findOneRole',result)
        // Hàm này trả ve news dau tien
        return result[0];
    }
    createUser = async (data) => {
        const sql = `INSERT INTO ${this.tableName}
        (Name, Tel, Mail, Username, Password, Image, Description, CreateAt) VALUES (?,?,?,?,?,?,?,?)`;
        if(data === undefined){
            console.log("chua co du lieu");
        }
        console.log('data:', data)
        const result = await query(sql, [data.name,data.tel,data.Mail,data.username,data.password,data.Image,data.Description,data.CreateAt]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("show ket qua",affectedRows)
        return affectedRows;
    }
}

module.exports = new userModels;