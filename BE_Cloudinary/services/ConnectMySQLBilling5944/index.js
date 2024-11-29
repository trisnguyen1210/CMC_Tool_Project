import mysql from 'mysql2/promise';

export const connectToMySQL = async () => {
    const connection = await mysql.createConnection({
        host: '101.99.59.44',
        user: 'admin',
        password: 'CmC123!@#',
        database: 'VoiceReport',
    });

    console.log('Kết nối MySQL CMC CDRs thành công');

    return connection;
}

export const executeQuery = async (connection, query) => {
    try {
        const [rows, fields] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.error('Lỗi truy vấn MySQL: ' + error.message);
        throw error;
    } finally {
        // Đóng kết nối sau khi hoàn thành truy vấn
        await connection.end();
    }
};