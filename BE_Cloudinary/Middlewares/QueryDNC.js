import { connectToMSSMS } from '../services/ConnectMSSMS/connectDNC.service.js'

export async function executeQueryMSSMS(query) {
    try {
        const pool = await connectToMSSMS();
        const result = await pool.request().query(query);
        return result;
    } catch (err) {
        console.error('SQL query execution error:', err);
        throw err;
    }
}
