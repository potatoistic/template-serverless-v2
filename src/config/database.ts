import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const poolConnection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "appdev",
});

export const db = drizzle(poolConnection, { logger: true });
