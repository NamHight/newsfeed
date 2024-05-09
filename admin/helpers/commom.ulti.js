const moment = require('moment');

exports.multipleColumnSet = (object) => { // ap dung cho cac cau lenh insert into, update....
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
    const keys = Object.keys(object);
    const values = Object.values(object);
    columnSet = keys.map(key => `${key} = ?`).join(', ');
    // where id = 1, title = "the e"
    console.log("show columnSet ", columnSet);
    console.log("show values ", [...values]);
    return {
        columnSet,
        values
    }
}

exports.multipleColumnSet2 = (object) => { // ap dung cho cac cau lenh sau where ma co nhieu dieu kien
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
    const keys = Object.keys(object);
    const values = Object.values(object);
    columnSet = keys.map(key => `${key} = ?`).join(' and ');
    // where id = 1, title = "the e"
    console.log("show columnSet ", columnSet);
    console.log("show values ", [...values]);
    return {
        columnSet,
        values
    }
}

exports.convertDate = (date) =>{
    return moment(date).format("LLL");
}