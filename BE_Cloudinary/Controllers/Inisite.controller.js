import { connectToMySQL5944, executeQuery5944 } from "../services/mySql5944.js";

export const getDataInsite = async (req, res) => {
    try {
        const connection = await connectToMySQL5944();
        const commandQuery = `SELECT ISDNNUMBER FROM VoiceReport.ContractsDetailInsight where STATUS_ISDN = 4 and MONTH(ENDDATE) =  3 and YEAR(ENDDATE) = 2024;`;

        const query = await executeQuery5944(connection, commandQuery);
        console.log(query);
        return res.status(200).json({ query })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Lỗi" })
    }
}