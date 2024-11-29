// db.js
import mysql from "mysql2";
import { setupSshTunnel565, closeSshTunnel565 } from "./sshTunnel565.js";
import { sendAlert } from "../botTelegram.js";
import { sendAlertEmail } from "../nodemailer.js";
import { VOS_65_DB_HOST, VOS_65_DB_INIT, VOS_65_DB_PASSWORD, VOS_65_DB_PORT, VOS_65_DB_USER } from "../../key.env.js";

const dbServer565 = {
    host: VOS_65_DB_HOST,
    port: VOS_65_DB_PORT,
    user: VOS_65_DB_USER,
    password: VOS_65_DB_PASSWORD,
    database: VOS_65_DB_INIT,
};

export let dbConnectionMysqlVos565;

export const connectDb565 = (stream) => {
    dbConnectionMysqlVos565 = mysql.createConnection({ ...dbServer565, stream });
    dbConnectionMysqlVos565.connect((err) => {
        if (err) {
            console.log("DB Mysql connection failed:", err);
        } else {
            console.log("DB Mysql565 connected!");
        }
    });
    setInterval(() => {
        if (dbConnectionMysqlVos565 && dbConnectionMysqlVos565.state === "disconnected") {
            sendAlert("MySQL connection VOS565 lost!");
            sendAlertEmail("tri.nvm@cmctelecom.vn", "Cảnh báo mất kết nối VOS565", "Lỗi mất kết nối DB")
        }
    }, 30000); // Kiểm tra mỗi 30 giây
    return dbConnectionMysqlVos565;
};

export const closedbConnectionMysqlVos565 = () => {
    if (dbConnectionMysqlVos565) dbConnectionMysqlVos565.end();
    closeSshTunnel565();
};

// Hàm tái kết nối tự động cho VOS DB 565
export const reconnectToVosDB565 = () => {
    console.log("Trying to reconnect to VOS DB 565...");
    try {
        setupSshTunnel565(dbServer565, connectDb565)
        console.log("Reconnected to VOS DB 565 successfully.");
    } catch (error) {
        console.error("Failed to reconnect to VOS DB 565:", error);
        // Thử kết nối lại sau một khoảng thời gian (ví dụ: 30 giây)
        setTimeout(reconnectToVosDB565, 30000);
    };
};

export default () => {
    setupSshTunnel565(dbServer565, connectDb565);
};


