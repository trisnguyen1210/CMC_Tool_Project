import {configInfo} from "./config.js";
import sql from "mssql";

let pool;

export async function connectToSQLServerDNC573() {
    if (!pool) {
        try {
            pool = await sql.connect(configInfo);
            console.log('Connected to SQLServer573');
        } catch (err) {
            console.error('SQL Server connection error: ', err);
        }
    }
    return pool;
}

export async function queryDatabaseServerDNC573(query) {
    try {
        const pool = await connectToSQLServerDNC573();
        const result = await pool.request().query(query);
        return result;
    } catch (err) {
        console.error('SQL query error: ', err);
    }
}

export async function closeSQLServerConnectDNC573() {
    if (pool) {
        try {
            await pool.close();
            console.log('SQL Server connection closed');
        } catch (err) {
            console.error('Error closing SQL Server connection: ', err);
        }
    }
}
