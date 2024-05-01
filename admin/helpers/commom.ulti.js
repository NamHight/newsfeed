
exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
    const keys = Object.keys(object);
    const values = Object.values(object);
    columnSet = keys.map(key => `${key} = ?`).join(', ');
    // where id = 1, title = "the e"
    console.log("show columnSet ", columnSet);
    return {
        columnSet,
        values
    }
}
