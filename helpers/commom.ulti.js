const moment = require('moment');

exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    console.log("show key ",keys);
    const values = Object.values(object);
    console.log("show values ",values)

    columnSet = keys.map(key => `${key} = ?`).join(', ');
    // where id = 1, title = "the e"
    console.log("show columnSet ", columnSet);
    return {
        columnSet,
        values
    }
}

exports.convertDate = (date) =>{
    return moment(date).format("LLL");
}
