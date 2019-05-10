
var lokidb = require('./db');

lokidb.initDbIfNotExist();
lokidb.initData();
lokidb.saveToDisk();

console.log('db erased');

