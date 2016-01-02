var Datastore = require('nedb')
    ,dbName = 'data.db'
    ,db;

if(!db) {
    db = new Datastore({
        filename: dbName, 
        autoload: false 
    });
    // console.log('Banco ' + dbName + ' pronto para uso')
}

module.exports = db;