import mysql from 'mysql2';

const dbServer565 = {
    host: "101.99.5.65",
    port: "3306",
    user: 'tri.nvm',
    password: 'P@ssw0rdCMC!@#$2024',
    database: 'vos3000',
};

export let connectionMySQL565;

export const connectMySQL565 = () => {
    if (connectionMySQL565) {
        console.log("Connect MySQL VOS565 thành công");
        return connectionMySQL565;
    }

    connectionMySQL565 = mysql.createConnection(dbServer565);

    connectionMySQL565.connect((err) => {
        if (err) {
            console.error('Lỗi kết nối: ' + err.stack);
            return;
        }
    });

    connectionMySQL565.on('error', (err) => {
        console.error('Lỗi kết nối: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Kết nối bị ngắt MYSQL VOS565, thử kết nối lại...');
            connectionMySQL565 = mysql.createConnection(dbServer565); // Tạo kết nối mới
            connectMySQL565(); // Gọi lại để xử lý kết nối mới
        } else {
            throw err;
        }
    });

    // Đảm bảo đóng kết nối khi không cần thiết
    process.on('SIGINT', () => {
        connectionMySQL565.end((err) => {
            if (err) {
                console.error('Lỗi khi đóng kết nối: ' + err.stack);
            } else {
                console.log('Kết nối đã được đóng.');
            }
            process.exit();
        });
    });

    return connectionMySQL565;
};  
