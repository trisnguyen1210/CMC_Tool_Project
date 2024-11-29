// db.js
import mysql from "mysql2";
import { setupSshTunnel568, closeSshTunnel568 } from "./sshTunnel568.js";
import { VOS_68_DB_HOST, VOS_68_DB_INIT, VOS_68_DB_PASSWORD, VOS_68_DB_PORT, VOS_68_DB_USER } from "../../key.env.js";

const dbServer568 = {
    host: VOS_68_DB_HOST,
    port: VOS_68_DB_PORT,
    user: VOS_68_DB_USER,
    password: VOS_68_DB_PASSWORD,
    database: VOS_68_DB_INIT,
};

export let dbConnectionMysqlVos568;

export const connectDb568 = (stream) => {
    dbConnectionMysqlVos568 = mysql.createConnection({ ...dbServer568, stream });
    dbConnectionMysqlVos568.connect((err) => {
        if (err) {
            console.log("DB Mysql connection failed:", err);
        } else {
            console.log("DB Mysql VOS568 connected!");
        }
    });

    return dbConnectionMysqlVos568;
};

export const closedbConnectionMysqlVos568 = () => {
    if (dbConnectionMysqlVos568) dbConnectionMysqlVos568.end();
    closeSshTunnel568();
};

// Hàm tái kết nối tự động cho VOS DB 568
export const reconnectToVosDB568 = () => {
    console.log("Trying to reconnect to VOS DB 568...");
    try {
        setupSshTunnel568(dbServer568, connectDb568)
        console.log("Reconnected to VOS DB 565 successfully.");
    } catch (error) {
        console.error("Failed to reconnect to VOS DB 568:", error);
        // Thử kết nối lại sau một khoảng thời gian (ví dụ: 30 giây)
        setTimeout(reconnectToVosDB568, 30000);
    };
};
export default () => {
    setupSshTunnel568(dbServer568, connectDb568);
};
