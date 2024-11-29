import fs from 'fs';
import path, { resolve } from 'path';
import { getDayAgo, getToDate, getYesterdayDate } from "../Middlewares/TimeStampToDateString.js";
import updateDataDNCVos from "../Middlewares/UpdateDataDNCToVos.js";
import { queryDatabaseServerDNC573 } from "../services/ConnectSQLServerDNC573/index.js"
import { addLimitE164, getLimitE164, getNumberInLimitE164 } from '../services/ConnectVos136/index.js';
import csv from 'csv-parser';
import readline from 'readline';
import CacheDNCModel from '../Models/CacheDNC.model.js';

export const updateDailyDataDNC = async (req, res) => {
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
        const resultData = resultQuery.recordsets[0];
        const dateMemo = getToDate();
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < resultData.length; i += 20) {
            const batch = resultData.slice(i, i + 20);
            await Promise.all(batch.map(async (element) => {
                element.msisdn = element.msisdn.replace(/^84/, '0');
                const updateVos = await updateDataDNCVos('101.99.1.36', element.msisdn, element.cmd_code, dateMemo);
            }));
            if (i + 20 < resultData.length) {
                await delay(3000); // 3-second delay
            }
        }
        return res.status(200).json({ resultData });
    } catch (error) {
        console.error('Error executing query: ', error);
    }
}

export const getListDNCVos = async (req, res) => {
    const ipVos = req.query.ipVos;
    const name = "DNC";
    try {
        switch (ipVos) {
            case "101.99.1.36":
                const rows = await getLimitE164(name);
                const logFolder = path.join('./logs/DNC');
                const timestamp = new Date().toISOString().replaceAll('-', '').split('T')[0]; // create a timestamp
                const logFilePath = path.join(logFolder, `DNC_${timestamp}.json`); // append the timestamp to the filename
                const files = fs.readdirSync(logFolder);
                const dncFiles = files.filter(file => file.startsWith('DNC_'));

                if (!fs.existsSync(logFolder)) {
                    fs.mkdirSync(logFolder, { recursive: true });
                }
                if (dncFiles.length > 0) {
                    const deleteFile = path.join(logFolder, `${dncFiles[0]}`)
                    fs.unlinkSync(deleteFile);
                }
                fs.writeFileSync(logFilePath, `${JSON.stringify(rows, null, 2)}`);
                break;
            default:
                return res.status(400).json({ status: "error", message: "Invalid IP" });
        }
        return res.status(200).json({
            status: "success",
            message: "Get list DNC thành công",
            data: "rows" // assuming 'rows' contains the data you want to send
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const recheckUpdateMemoDNC = async (req, res) => {
    const ipVos = req.query.ipVos;
    const name = "DNC";
    const yesterday = getYesterdayDate();
    const dayAgo = getDayAgo(2);
    const dayAgo3 = getDayAgo(3);
    const dayAgo4 = getDayAgo(4);
    const dayAgo5 = getDayAgo(5);
    const dayAgo6 = getDayAgo(6);
    const dayAgo7 = getDayAgo(7);
    const dayAgo8 = getDayAgo(8);
    const dayAgo9 = getDayAgo(9);
    const dayAgo10 = getDayAgo(10);
    const dayAgo11 = getDayAgo(11);
    const dayAgo12 = getDayAgo(12);
    const dayAgo13 = getDayAgo(13);
    const dayAgo14 = getDayAgo(14);
    const dayAgo15 = getDayAgo(15);
    const dayAgo16 = getDayAgo(16);
    const dayAgo17 = getDayAgo(17);
    const dayAgo18 = getDayAgo(18);
    const dayAgo19 = getDayAgo(19);

    try {
        switch (ipVos) {
            case "101.99.1.36":
                const rows = await getLimitE164(name);
                const stringListDNC = JSON.stringify(rows);
                if (!stringListDNC.includes(dayAgo19)) {
                    await reupDataDNCVos(19, ipVos, dayAgo19);
                }
                if (!stringListDNC.includes(dayAgo18)) {
                    await reupDataDNCVos(18, ipVos, dayAgo18);
                }
                if (!stringListDNC.includes(dayAgo17)) {
                    await reupDataDNCVos(17, ipVos, dayAgo17);
                }
                if (!stringListDNC.includes(dayAgo16)) {
                    await reupDataDNCVos(16, ipVos, dayAgo16);
                }
                if (!stringListDNC.includes(dayAgo15)) {
                    await reupDataDNCVos(15, ipVos, dayAgo15);
                }
                if (!stringListDNC.includes(dayAgo14)) {
                    await reupDataDNCVos(14, ipVos, dayAgo14);
                }
                if (!stringListDNC.includes(dayAgo13)) {
                    await reupDataDNCVos(13, ipVos, dayAgo13);
                }
                if (!stringListDNC.includes(dayAgo12)) {
                    await reupDataDNCVos(12, ipVos, dayAgo12);
                }
                if (!stringListDNC.includes(dayAgo11)) {
                    await reupDataDNCVos(11, ipVos, dayAgo11);
                }
                if (!stringListDNC.includes(dayAgo10)) {
                    await reupDataDNCVos(10, ipVos, dayAgo10);
                }
                if (!stringListDNC.includes(dayAgo9)) {
                    await reupDataDNCVos(9, ipVos, dayAgo9);
                }
                if (!stringListDNC.includes(dayAgo8)) {
                    await reupDataDNCVos(8, ipVos, dayAgo8);
                }
                if (!stringListDNC.includes(dayAgo7)) {
                    await reupDataDNCVos(7, ipVos, dayAgo7);
                }
                if (!stringListDNC.includes(dayAgo6)) {
                    await reupDataDNCVos(6, ipVos, dayAgo6);
                }
                if (!stringListDNC.includes(dayAgo5)) {
                    await reupDataDNCVos(5, ipVos, dayAgo5);
                }
                if (!stringListDNC.includes(dayAgo4)) {
                    await reupDataDNCVos(4, ipVos, dayAgo4);
                }
                if (!stringListDNC.includes(dayAgo3)) {
                    await reupDataDNCVos(3, ipVos, dayAgo3);
                }
                if (!stringListDNC.includes(dayAgo)) {
                    await reupDataDNCVos(2, ipVos, dayAgo);
                }
                if (!stringListDNC.includes(yesterday)) {
                    await reupDataDNCVos(1, ipVos, yesterday);
                }
                return res.status(200).json({ status: "success", message: "Get list DNC thành công" });
            default:
                return res.status(400).json({ status: "error", message: "Invalid IP" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: "error", message: error });
    }
}

export const reupDataMissingByDate = async (req, res) => {
    const ipVos = req.query.ipVos;
    const name = "DNC";
    const yesterday = getYesterdayDate();
    const dayAgo = getDayAgo(2);
}

const reupDataDNCVos = async (day, ipVos, dateMemo) => {
    try {
        const stringQuery = `
            SELECT * FROM (
                SELECT *,
                    ROW_NUMBER() OVER(PARTITION BY msisdn ORDER BY CONVERT(DATETIME, mo_time, 103) DESC) AS rn 
                FROM [Do_Not_Call].[dbo].[DNC] 
                WHERE CAST(CONVERT(DATETIME, mo_time, 103) AS DATE) = CAST(DATEADD(DAY, -${day}, GETDATE()) AS DATE)
            ) t 
            WHERE t.rn = 1
            ORDER BY CONVERT(DATETIME, mo_time, 103) DESC`;
        const resultQuery = await queryDatabaseServerDNC573(stringQuery);
        const resultData = resultQuery.recordsets[0];
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < resultData.length; i += 1) {
            const batch = resultData.slice(i, i + 1);
            await Promise.all(batch.map(async (element) => {
                element.msisdn = element.msisdn.replace(/^84/, '0');
                await updateDataDNCVos(ipVos, element.msisdn, element.info, dateMemo);
                await delay(1000); // 3-second delay
            }));
            // if (i + 10 < resultData.length) {
            //     await delay(3000); // 3-second delay
            // }
        }
        return resultData;
    } catch (error) {
        console.error('Error executing query: ', error);
    }

}

export const getListDNCMSSMS = async (req, res) => {
    try {
        const stringQuery = `select msisdn from ( select *, row_number() over(partition by msisdn order by  convert(datetime, mo_time, 103) desc) as rn from [Do_Not_Call].[dbo].[DNC] ) t where t.rn = 1 and cmd_code = 'DK'`;
        const resultQuery = await queryDatabaseServerDNC573(stringQuery);
        const resultData = resultQuery.recordsets[0];
        const logFolder = path.join('./logs/DNC');
        const timestamp = new Date().toISOString().replaceAll('-', '').split('T')[0]; // create a timestamp
        const logFilePath = path.join(logFolder, `DNC_${timestamp}.json`); // append the timestamp to the filename
        const files = fs.readdirSync(logFolder);
        const dncFiles = files.filter(file => file.startsWith('DNC_'));

        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, { recursive: true });
        }
        if (dncFiles.length > 0) {
            const deleteFile = path.join(logFolder, `${dncFiles[0]}`)
            fs.unlinkSync(deleteFile);
        }
        fs.writeFileSync(logFilePath, `${JSON.stringify(resultData, null, 2)}`);
        return res.status(200).json({ status: "success", message: `export file finish ${logFilePath}` });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const readNumberInDNC = async (req, res) => {
    const number = req.query.number;

    const attempAction = async (actionFunc, body) => {
        let attempts = 0;
        const maxAttempts = 3;
        const delay = 3000;
        while (attempts < maxAttempts) {
            try {
                return await actionFunc(body)
            } catch (error) {
                attempts++;
                console.log(`Attempt ${attempts} failed. Retrying in ${delay / 1000} seconds...`);
                if (attempts >= maxAttempts) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    try {
        const rawBody = `{"limitE164GroupName":"DNC","e164":"${number}"}`;
        const result = await attempAction(getNumberInLimitE164, rawBody)
        let status = 0;
        let message = "Không có trong DNC VOS";
        if (result.length > 0) {
            status = 1;;
            message = "Có dữ liệu trong DNC VOS";
        }
        return res.status(200).json({ status, message, data: result })
    } catch (error) {
        console.log(`Error readLimitE164 time: ${date}\n`, error.message, error.stack);
        return { success: false, message: error.message };
    }
}

export const updateDNCFromFile = async (req, res) => {
    const attemptAction = async (actionFunction, body) => {
        let attempts = 0;
        const maxAttempts = 3; // Số lần thử tối đa
        const delay = 3000; // Thời gian delay (3 giây)
        while (attempts < maxAttempts) {
            try {
                console.log(body);
                return await actionFunction(body);
            } catch (error) {
                attempts++;
                console.log(`Attempt ${attempts} failed. Retrying in ${delay / 1000} seconds...`);
                if (attempts >= maxAttempts) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };

    try {
        const fileStream = fs.createReadStream(urlFile);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let isFirstLine = true; // Flag to track the first line

        // Create an async function to process each line
        const processLine = async (line) => {
            if (isFirstLine) {
                isFirstLine = false; // Skip the first line
                return;
            }
            const splitLine = line.split(',');
            const indexFile = splitLine[0];
            const number = splitLine[1].replace(new RegExp('^84'), '0');
            const dateMemo = splitLine[3].split(' ')[0].replaceAll('/', '.');
            console.log(indexFile, number, dateMemo);
            const rawBodyCheck = `{"limitE164GroupName":"DNC","e164":"${number}"}`;
            const resultCheck = await attemptAction(getNumberInLimitE164, rawBodyCheck);
            console.log("CHECK:::", resultCheck);

            if (!resultCheck || resultCheck.length === 0) {
                const rawBodyAddNew = `{"limitE164GroupName": "DNC", "infoLimitE164s": [{ "e164": "${number}","memo":"${dateMemo}" }]}`;
                const resultAddNew = await attemptAction(addLimitE164, rawBodyAddNew);
                console.log("ADD NEW:", resultAddNew);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        };

        // Use a for-await-of loop to process lines sequentially
        for await (const line of rl) {
            await processLine(line);
        }

        res.end(); // Kết thúc response
        fileStream.close();

    } catch (error) {
        if (!responseSent) {
            res.status(500).send(error.message); // Gửi lỗi nếu có
        }
    }
} 