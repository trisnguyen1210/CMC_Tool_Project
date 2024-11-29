import mysql from 'mysql2/promise';

export const connectToMySQL5944 = async () => {
    const connection = await mysql.createConnection({
        host: '101.99.59.44',
        user: 'admin',
        password: 'CmC123!@#',
        database: 'VoiceReport',
    });

    console.log('Kết nối MySQL Billing thành công');

    return connection;
}

export const executeQuery5944 = async (connection, query) => {
    try {
        const [rows, fields] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.error('Lỗi truy vấn MySQL: ' + error.message);
        throw error;
    } finally {
        // Đóng kết nối sau khi hoàn thành truy vấn.
        await connection.end();
    }
};