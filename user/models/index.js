const {multipleColumnSet} = require('../helpers/commom.ulti')
const query = require('../db/connection')

class IndexModel {
   
  tableName = 'user'

  create = async (data ) => {
    const sql = `INSERT INTO ${this.tableName}(Mail,Role,CreateAt) VALUES (?,?,?)`;
    const result = await query(sql, [data.Mail,2,new Date()]);
    const affectedRows = result ? result.affectedRows : 0;
    console.log("affectedRows: " + affectedRows);
    return affectedRows;
  }


}

module.exports = new IndexModel();
