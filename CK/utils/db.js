const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root3306",
    database: "sandaugiatructuyen"
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql_string => mysql_query(sql_string),
    add: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity),
    patch: (tableName, entity, condition) => {
        mysql_query(`update ${tableName} set ? where ?`, [entity, condition])
    },
};