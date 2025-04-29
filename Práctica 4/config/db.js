import mysql from 'mysql2';

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_estudiante'
}).promise();

export default pool;