import mysql from "mysql2"

export const db = mysql.createConnection({
    //connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "banco123",
  database: process.env.MYSQL_DATABASE || "db_smt",
});