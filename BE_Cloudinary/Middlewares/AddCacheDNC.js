import CacheDNCModel from "../Models/CacheDNC.model.js";
import { queryDatabaseServerDNC573 } from "../services/ConnectSQLServerDNC573/index.js";
import updateDataDNCVos from "./UpdateDataDNCToVos.js";

export const addCacheToCacheDNC = async (req, res, next) => {
    try {
        const stringQuery = `
        SELECT * FROM (
            SELECT *,
            ROW_NUMBER() OVER(PARTITION BY msisdn ORDER BY CONVERT(DATETIME, mo_time, 103) DESC) AS rn 
            FROM [Do_Not_Call].[dbo].[DNC] 
            WHERE CAST(CONVERT(DATETIME, mo_time, 103) AS DATE) = CAST(DATEADD(DAY, 0, GETDATE()) AS DATE)
            ) t 
            WHERE t.rn = 1
            ORDER BY CONVERT(DATETIME, mo_time, 103) DESC`;
        const resultQuery = await queryDatabaseServerDNC573(stringQuery);
        const cacheData = resultQuery.recordset;

        const createPromises = cacheData.map(async element => {
            const isUpdate = await CacheDNCModel.findOne({
                msisdn: element.msisdn,
                cmd_code: element.cmd_code,
                mo_time: element.mo_time
            });
            if (!isUpdate) {
                return CacheDNCModel.create({ ...element, processUpdate: "no" });
            }
            return null;
        });

        await Promise.all(createPromises.filter(Boolean));
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json("Can't query DB DNC");
    }
}

export const importCacheToDNCVOS = async (req, res, next) => {
    try {
        const checkCache = await CacheDNCModel.find({ processUpdate: "no" });

        for (const element of checkCache) {
            try {
                const updateVOS = await updateDataDNCVos(
                    '101.99.1.36',
                    element.msisdn.replace(/^84/, '0'),
                    element.cmd_code.trim(),
                    element.mo_time.split(' ')[0].replace(/\//g, '.')
                );

                if (updateVOS) {
                    await CacheDNCModel.findOneAndUpdate(
                        { msisdn: element.msisdn, cmd_code: element.cmd_code, mo_time: element.mo_time },
                        { processUpdate: "yes" }
                    );
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(`Lỗi khi xử lý msisdn ${element.msisdn}:`, error);
                // Có thể thêm xử lý lỗi riêng cho từng bản ghi
            }
        }
        req.process = "finish";
        req.status = "success";
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json("Can't query Cache DNC");
    }
}