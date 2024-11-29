import _ from "lodash";
import { restartVos3000d } from "../Middlewares/RestartVos3000d.js";
import { sendMailFeeVos } from "../Middlewares/SendMail.js";
import { timeStringToDate, timestampToDateString } from "../Middlewares/TimeStampToDateString.js";
import WarningFeeVosModel from "../Models/WarningFeeVos.model.js";
import { deleteMappingGateway136, getFeeAccountVos136, getListAccountVos136, getMappingGatewayVos136, getRoutingGatewayVos136, payFeeAccountVos136, updateMappingGateway136 } from "../services/ConnectVos136/index.js";
import { dbConnectionMysqlVos565, reconnectToVosDB565 } from "../services/ConnectVos565/mySqlVos565.js";
import { dbConnectionMysqlVos568, reconnectToVosDB568 } from "../services/ConnectVos568/mySqlVos568.js";
import path from 'path';
import fs from 'fs';
import CurrentCallVos136Model from "../Models/CurrentCallVos136.model.js";
import MaxCCVosModel from "../Models/MaxCCVos.model.js";
import { connectMySQL565, connectionMySQL565 } from "../services/ConnectVos565/mySQLVos565.test.js";

///// Group Fee Vos
export const queryFeeVOS = async (req, res) => {
    const ipVos = req.query.ipVos;
    const queryField =
        "id,account,name,starttime,lastupdatetime,money,validtime,limitmoney,locktype";
    const table = "e_customer";
    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            if (ipVos === "101.99.5.65") {
                try {
                    const dbConnectionMysql565 = await connectMySQL565();
                    dbConnectionMysql565.query(
                        `select ${queryField} from ${table}`,
                        (err, rows, fields) => {
                            if (err) { return reject(err); }
                            resolve([rows, fields]);
                        }
                    );
                } catch (error) {
                    reconnectToVosDB565();
                }
            } else if (ipVos === "101.99.5.68") {
                try {
                    dbConnectionMysqlVos568.query(
                        `select ${queryField} from ${table}`,
                        (err, rows, fields) => {
                            if (err) { return reject(err); }
                            resolve([rows, fields]);
                        }
                    );
                } catch (error) {
                    reconnectToVosDB568();
                }
            } else if (ipVos === "101.99.1.36") {
                const getListAccount = await getListAccountVos136();
                const getFeeAccount = await getFeeAccountVos136(getListAccount);
                if (getFeeAccount) {
                    resolve([getFeeAccount, null])
                }
            }
        });

        const data = rows.map((e) => {
            if (e.money < 0) {
                e.money *= -1;
            }
            e.starttime = timestampToDateString(e.starttime);
            e.lastupdatetime = timestampToDateString(e.lastupdatetime);
            e.validtime = timestampToDateString(e.validtime);
            //round max 2 number
            if (e.limitmoney === 0) {
                e.percent = 0;
            } else {
                e.percent = Math.round((e.money / e.limitmoney) * 100 * 100) / 100;
            }
            return e;
        });

        return res.status(200).json({ status: "success", message: "Lấy cước thành công", data: data });
    } catch (error) {
        console.log("queryFeeVos fail:", error);
        return res.status(500).json({ status: "error", message: "Lấy cước thất bại", data: error.message });
    }
};

export const warningFeeVos = async (req, res) => {
    const ipVos = req.query.ipVos;
    const queryField = "id,account,lastupdatetime,money,validtime,limitmoney,locktype";
    const date = new Date();
    const table = "e_customer";
    let listWarning = [];
    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            if (ipVos === "101.99.5.65") {
                try {
                    const dbConnectionMysql565 = await connectMySQL565();
                    dbConnectionMysql565.query(
                        `select ${queryField} from ${table}`,
                        (err, rows, fields) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve([rows, fields]);
                        }
                    )
                } catch (error) {
                    reconnectToVosDB565();
                }
            }
            if (ipVos === "101.99.5.68") {
                try {
                    dbConnectionMysqlVos568.query(
                        `select ${queryField} from ${table}`,
                        (err, rows, fields) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve([rows, fields]);
                        }
                    );
                } catch (error) {
                    reconnectToVosDB568();
                }
            }
            if (ipVos === "101.99.1.36") {
                const getListAccount = await getListAccountVos136();
                const getFeeAccount = await getFeeAccountVos136(getListAccount);
                if (getFeeAccount) {
                    resolve([getFeeAccount, null])
                }
            }
        });
        const promises = rows.map(async (e) => {
            if (e.money < 0) {
                e.money *= -1;
            }

            if (e.limitmoney === 0) {
                e.percent = 0;
            } else {
                e.percent = (e.money / e.limitmoney) * 100;
            }
            const checkExists = await WarningFeeVosModel.findOne({ account: e.account, ipServer: ipVos });
            if (e.percent >= 80) {              //Mục >= 80
                listWarning.push(e.account);
                if (!checkExists) {             //Mục >= 80 và không tồn tại
                    const createWarningFeeVosModel = await WarningFeeVosModel.create({ ...e, idAccount: e.id, percent: e.percent, statusWarning: "none", ipServer: ipVos });
                    console.log(`Thêm ${createWarningFeeVosModel.account} vào list cảnh báo lúc ${date}`);
                } else if (checkExists) {
                    const updateWarningFeeVosModel = await checkExists.updateOne({ money: e.money, percent: e.percent })
                }
            } else {//Mục < 80
                if (e.percent < 80 && checkExists?.account === e.account) { //Mục < 80 và tồn tại
                    const deleteWarning = await WarningFeeVosModel.deleteOne({ account: e.account })
                    console.log(`Xoá warning account ${e.account} `);
                }
            }
        });

        Promise.all(promises).then(() => {
            if (listWarning.length > 0) {
                sendMailFeeVos(listWarning, ipVos);
            }
        })

        return res.status(200).json({ status: "success", message: `Quét xong lúc ${date}`, data: rows });
    } catch (error) {
        reconnectToVosDB565();
        reconnectToVosDB568();
        return res.status(500).json({ status: "error", message: "Lấy cước thất bại", data: error.message });
    }
};
//////

export const getAccountVos = async (req, res) => {
    const ipVos = req.query.ipVos;
    const queryField = "id,account,name,money";
    const table = "e_customer";
    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            console.log(ipVos);
            switch (ipVos) {
                case "101.99.5.68":
                    try {
                        dbConnectionMysqlVos568.query(`select ${queryField} from ${table}`, (err, rows, fields) => {
                            if (err) { return reject(err); }
                            resolve([rows, fields]);
                        });
                    } catch (error) { reconnectToVosDB568(); }
                    break;
                case "101.99.5.65":
                    try {
                        dbConnectionMysqlVos565.query(`select ${queryField} from ${table}`, (err, rows, fields) => {
                            if (err) { return reject(err); }
                            resolve([rows, fields]);
                        });
                    } catch (error) { reconnectToVosDB565(); }
                    break;
                case "101.99.1.36":
                    const fetchListAccountVos136 = async () => {
                        const listAccountVos136 = await getListAccountVos136();
                        return listAccountVos136;
                    };
                    const response = await fetchListAccountVos136();
                    const formatResponse = response.map((e, index) => { return { id: index, name: e, account: e } })
                    resolve([formatResponse, null]);
                    break;
                default:
                    return res.status(500).json({ status: "error", message: "Không thấy thông tin ipVos" });
            }
        });
        return res.status(200).json({ status: "success", message: "Lấy list account thành công", data: rows });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Lấy list account thất bại", data: error.message });
    }
}

///// Group Gateway Vos
//Read GW
export const readListNameMappingGW = async (req, res) => {
    const ipSearch = req.query.ipSearch;
    let result;
    try {
        switch (ipSearch) {
            case "101.99.1.36":
                const raw = "{}";
                result = await getMappingGatewayVos136(raw);
                break;
            default:
                return res.status(400).json({ status: "error", message: "IP không hợp lệ" });
        }
        const response = Array.isArray(result) ? _.map(result, 'name') : [];
        return res.status(200).json({ status: "success", message: "Lấy listNameGW thành công", data: response });
    } catch (error) {
        const timeNow = new Date();
        return res.status(500).json({ status: "error", message: "Lấy listNameGW thất bại", error, timeNow })
    }
}

const readMappingGatewayVos = async (ipSearch, inputSearch, isListSearch, res) => {
    const queryField = `e_gatewaymapping.id, e_gatewaymapping.\`name\`, e_gatewaymappingsetting.calloutcallerprefixes, e_gatewaymappingsetting.gatewaymapping_id`;
    const table = `e_gatewaymapping INNER JOIN e_gatewaymappingsetting ON e_gatewaymapping.id = e_gatewaymappingsetting.gatewaymapping_id`;
    let condition = ``;

    if (isListSearch) {
        const listSearchString = inputSearch.split(',').map(e => e.trim());
        condition = listSearchString.map(e => `e_gatewaymappingsetting.calloutcallerprefixes LIKE '%${e}%'`).join(' OR ');
    } else {
        condition = `e_gatewaymappingsetting.calloutcallerprefixes LIKE '%${inputSearch}%'`;
    }

    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            switch (ipSearch) {
                case "101.99.5.68":
                    dbConnectionMysqlVos568.query(
                        `select ${queryField} from ${table} where ${condition}`,
                        (err, rows, fields) => {
                            if (err) { return reject(err); }
                            if (rows) {
                                const listInputNumbers = inputSearch.replace(`1;`, '').split(',');
                                const result = rows.map((row) => {
                                    const commonNumbers = listInputNumbers.filter(num => row.calloutcallerprefixes.replace("1;", '').split(',').includes(num));
                                    const findKey = commonNumbers.join(",");
                                    return {
                                        name: row.name,
                                        prefixes: row.calloutcallerprefixes.replace("1;", ''),
                                        length: row.calloutcallerprefixes.split(',').length,
                                        findKey: findKey.replace("1;", ''),
                                    }
                                })
                                resolve([result, fields]);
                            }
                        }
                    );
                    break;

                case "101.99.5.65":
                    const dbConnectionMysql565 = await connectMySQL565(); // Kết nối cơ sở dữ liệu cho ipSearch
                    dbConnectionMysql565.query(
                        `SELECT ${queryField} FROM ${table} WHERE ${condition}`,
                        (err, rows, fields) => {
                            if (err) { return reject(err); }
                            if (rows) {
                                const listInputNumbers = inputSearch.replace("1;", '').split(',');
                                const result = rows.map((row) => {
                                    const commonNumbers = listInputNumbers.filter(num => row.calloutcallerprefixes.replace("1;", '').split(',').includes(num));
                                    const findKey = commonNumbers.join(",");
                                    return {
                                        name: row.name,
                                        prefixes: row.calloutcallerprefixes.replace("1;", ''),
                                        length: row.calloutcallerprefixes.split(',').length,
                                        findKey: findKey.replace("1;", ''),
                                    }
                                });
                                resolve([result, fields]);
                            }
                        }
                    );
                    break;
                case "101.99.1.36":
                    const raw = "{}";
                    const getMappingGatewayVos = async (raw) => {
                        const listMappingGateway = await getMappingGatewayVos136(raw);
                        const listInputNumbers = inputSearch.split(',');

                        const result = listMappingGateway.flatMap(e => {
                            const listGatewayNumbers = e.calloutCallerPrefixes.split(',');
                            const commonNumbers = listInputNumbers.filter(num => listGatewayNumbers.includes(num));

                            if (commonNumbers.length > 0) {
                                const prefixes = e.calloutCallerPrefixes;
                                const length = listGatewayNumbers.length;
                                const findKey = commonNumbers.join(",");

                                return { name: e.name, prefixes, length, findKey };
                            }

                            return [];
                        });

                        resolve([result, null]);
                    }
                    getMappingGatewayVos(raw);
                    break;
                default:
                    console.log(ipSearch)
                    return res.status(404).json({ status: "fail", message: "Không nhận được thông tin VOS" });
            }
        });
        return rows;
    } catch (error) {
        const timeNow = new Date();
        console.log(error);
        return res.status(500).json({ status: "success", message: "tìm kiếm thất bại", data: error, timeNow });
    }
}

const executeQueryWithReconnect = (dbConnection, query, retries = 3) => {
    return new Promise((resolve, reject) => {
        const attemptQuery = (retryCount) => {
            dbConnection.query(query, (err, rows, fields) => {
                if (err) {
                    if (retryCount > 0) {
                        // Gọi hàm reconnect và thử lại
                        if (dbConnection === dbConnectionMysqlVos565) {
                            reconnectToVosDB565();
                        } else if (dbConnection === dbConnectionMysqlVos568) {
                            reconnectToVosDB568(); // Giả định có hàm này
                        }
                        console.log('Đang cố gắng kết nối lại...');

                        // Thực hiện lại truy vấn sau một khoảng thời gian ngắn
                        setTimeout(() => attemptQuery(retryCount - 1), 1000);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve([rows, fields]);
                }
            });
        };

        // Bắt đầu thực hiện truy vấn
        attemptQuery(retries);
    });
};


const readRoutingGatewayVos = async (ipSearch, inputSearch, isListSearch, res) => {
    const queryField = `e_gatewayrouting.id, e_gatewayrouting.prefix ,e_gatewayrouting.\`name\`, e_gatewayroutingsetting.callincalleeprefixes, e_gatewayroutingsetting.gatewayrouting_id`;
    const table = `e_gatewayrouting INNER JOIN e_gatewayroutingsetting ON e_gatewayrouting.id = e_gatewayroutingsetting.gatewayrouting_id`;
    let condition = ``;
    if (isListSearch === false) {
        // condition = `e_gatewayroutingsetting.callincalleeprefixes LIKE '%${inputSearch}%'`
        condition = `e_gatewayrouting.prefix LIKE '%${inputSearch}%'`
    } else {
        const listSearchString = inputSearch.split(",");
        listSearchString.forEach((e, index) => {
            // condition = condition + `e_gatewayroutingsetting.callincalleeprefixes LIKE '%${e}%' ${index !== (listSearchString.length - 1) ? "OR" : ""} `
            condition = condition + `e_gatewayrouting.prefix LIKE '%${e}%' ${index !== (listSearchString.length - 1) ? "OR" : ""} `
        });

    }
    try {
        const [rows, fields] = await new Promise((resolve, reject) => {
            switch (ipSearch) {
                case "101.99.5.68":
                    dbConnectionMysqlVos568.query(
                        `select ${queryField} from ${table} where ${condition}`,
                        (err, rows, fields) => {
                            if (err) { return reject(err); }
                            if (rows) {
                                const listInputNumbers = inputSearch.split(',');
                                const result = rows.map((row) => {
                                    const commonNumbers = listInputNumbers.filter(num => row.prefix.includes(num));
                                    const findKey = commonNumbers.join(",");
                                    return {
                                        name: row.name,
                                        prefixes: row.prefix,
                                        length: row.prefix.split(',').length,
                                        findKey: findKey
                                    }
                                })
                                resolve([result, fields]);
                            }
                        }
                    );
                    break;

                case "101.99.5.65":
                    connectionMySQL565.query(
                        `select ${queryField} from ${table} where ${condition}`,
                        (err, rows, fields) => {
                            if (err) {
                                return reject(err);
                            }
                            if (rows) {
                                const listInputNumbers = inputSearch.split(',');
                                const result = rows.map((row) => {
                                    const commonNumbers = listInputNumbers.filter(num => row.prefix.includes(num));
                                    const findKey = commonNumbers.join(",");
                                    return {
                                        name: row.name,
                                        prefixes: row.prefix,
                                        length: row.prefix.split(',').length,
                                        findKey: findKey
                                    }
                                })
                                resolve([result, fields]);
                            }
                        }
                    );
                    break;

                case "101.99.1.36":
                    const raw = "{}";
                    const getRoutingGatewayVos = async (raw) => {
                        const listMappingGateway = await getRoutingGatewayVos136(raw);
                        const listInputNumbers = inputSearch.split(',');

                        const result = listMappingGateway.flatMap(e => {
                            const listGatewayNumbers = e.prefix.split(',');
                            const commonNumbers = listInputNumbers.filter(num => listGatewayNumbers.includes(num));

                            if (commonNumbers.length > 0) {
                                const prefixes = e.prefix;
                                const length = listGatewayNumbers.length;
                                const findKey = commonNumbers.join(",");

                                return { name: e.name, prefixes, length, findKey };
                            }
                            return [];
                        });
                        resolve([result, null]);
                    }
                    getRoutingGatewayVos(raw);
                    break;
                default:
                    console.log(ipSearch)
                    return res.status(404).json({ status: "fail", message: "Không nhận được thông tin VOS" });
            }
        });
        return rows;
    } catch (error) {
        console.log("error readRoutingGatewayVos", error);
        return res.status(500).json({ status: "success", message: "tìm kiếm thất bại", data: error });
    }
}

export const readGatewayVos = async (req, res) => {
    const ipSearch = req.query.ipSearch;
    const inputSearch = req.query.inputSearch.toString();
    const isListSearch = inputSearch.split(',').length > 1;
    const tableSearch = req.query.tableSearch;
    let rows;
    switch (tableSearch) {
        case "Routing":
            rows = await readRoutingGatewayVos(ipSearch, inputSearch, isListSearch, res)
            return res.status(200).json({ status: "success", message: "tìm kiếm thành công", data: rows });

        case "Mapping":
            rows = await readMappingGatewayVos(ipSearch, inputSearch, isListSearch, res)
            return res.status(200).json({ status: "success", message: "tìm kiếm thành công", data: rows });
        default:
            return res.status(400).json({ status: "error", message: "Không thấy bảng cần tìm" })
    }
}

export const readFlowDataMappingGW = async (req, res) => {
    const type = req.query.type;
    const ipSearch = req.query.ipSearch;
    const listNameGW = Array.isArray(req.query.listNameGW) ? req.query.listNameGW : [req.query.listNameGW];
    const timeString = req.query.timeString;
    let result = [];
    let queryCondition;
    try {
        switch (ipSearch) {
            case "101.99.1.36":
                if (type.includes("date")) {
                    const timeBeginString = timeString.timeBeginString;
                    const timeEndString = timeString.timeEndString;
                    queryCondition = { $match: { "groupByMappingGW.callerGatewayId": { $in: listNameGW }, createdAt: {} } };

                    const timeBeginDate = new Date(timeBeginString);
                    if (timeBeginDate != "Invalid Date") {
                        queryCondition.$match.createdAt['$gt'] = timeBeginDate;
                    };

                    const timeEndDate = new Date(timeEndString);
                    if (timeEndDate != "Invalid Date") {
                        queryCondition.$match.createdAt['$lt'] = timeEndDate;
                    };

                    result = await CurrentCallVos136Model.aggregate([
                        queryCondition,
                        {
                            $project: {
                                _id: 0,
                                createdAt: 1,
                                groupByMappingGW: {
                                    $filter: { input: "$groupByMappingGW", as: "item", cond: { $in: ["$$item.callerGatewayId", listNameGW] } }
                                }
                            }
                        }, {
                            $addFields: {
                                groupByMappingGW: {
                                    $arrayToObject: {
                                        $map: { input: "$groupByMappingGW", as: "item", in: { k: "$$item.callerGatewayId", v: "$$item.count" } }
                                    }
                                }
                            }
                        }
                    ]);
                }
                if (type === "day") {
                    const formattedTimeDayString = timeString.split(" ")[0].split("-");
                    const queryTime = `${formattedTimeDayString[2]}/${formattedTimeDayString[1]}/${formattedTimeDayString[0]}`;
                    queryCondition = { nameTime: { $regex: queryTime } };
                    result = await MaxCCVosModel.findOne(queryCondition);
                    let maxDataLimited = [];
                    if (result && result.maxData) {
                        maxDataLimited = result.maxData.slice(0, 20);
                    }
                    result = { ...result, maxData: maxDataLimited };
                };
                if (type === "week" || type === "month" || type === "quarter" || type === "year") {
                    const timeBeginString = timeStringToDate(timeString.timeBeginString);
                    const timeEndString = timeStringToDate(timeString.timeEndString);

                    const timeBeginDate = new Date(timeBeginString);
                    queryCondition = { createdAt: {} }
                    if (timeBeginDate != "Invalid Date") {
                        queryCondition.createdAt['$gt'] = timeBeginDate;
                    };
                    const timeEndDate = new Date(timeEndString);
                    if (timeEndDate != "Invalid Date") {
                        queryCondition.createdAt['$lt'] = timeEndDate;
                    };

                    const maxData = await MaxCCVosModel.aggregate([
                        { $match: queryCondition },
                        { $unwind: "$maxData" }, // Giải phóng mảng
                        { $sort: { "maxData.count": -1 } }, // Sắp xếp giảm dần theo count
                        {
                            $group: {
                                _id: '$maxData.name',
                                name: { $first: '$maxData.name' },
                                count: { $first: '$maxData.count' },
                                snapTime: { $first: '$maxData.snapTime' }
                            }
                        },
                        { $sort: { "count": -1 } }, // Sắp xếp giảm dần theo count
                        { $limit: 20 },
                        { $project: { _id: 0, name: 1, count: 1, snapTime: 1 } },
                    ]);
                    result = { ...result, maxData: maxData };
                }
                return res.status(200).json({ status: "success", message: "Lấy lượng CC GW thành công", data: { type: type.toString(), result } })
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(new Date(), error);
        return res.status(500).json({ status: "error", message: error })
    }
}

// Modify GW
export const updateMappingGateway = async (req, res) => {
    const { name, filteredPrefixesString } = req.body;
    const ipVos = req.query.ipVos;
    let dataBK;
    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            switch (ipVos) {
                case "101.99.1.36":
                    const rawBody = `{"names":["${name}"]}`;
                    dataBK = await getMappingGatewayVos136(rawBody);
                    const fetchUpdateMappingGW = async (name, filteredPrefixesString) => {
                        const newMappingGW = await updateMappingGateway136(name, filteredPrefixesString);
                        return newMappingGW;
                    }
                    const response = await fetchUpdateMappingGW(name, filteredPrefixesString);
                    resolve([response, null]);
                    break;
                default:
                    break;
            }
        })
        const logFolder = path.join('./logs/updateMappingGW');
        const logFilePath = path.join(logFolder, `updateMappingGW.txt`);

        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, { recursive: true });
        }
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} - Update nameMappingGateway:${name} | DataBK: ${JSON.stringify(dataBK)}\n\n`);

        return res.status(200).json({ status: "success", message: "Update MappingGW thành công", data: rows });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Update MappingGW thất bại", data: error.message });
    }
}

export const deleteMappingGateway = async (req, res) => {
    const { name, ipVos } = req.query;
    let dataBK;
    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            switch (ipVos) {
                case "101.99.1.36":
                    const rawBody = `{"names":["${name}"]}`;
                    dataBK = await getMappingGatewayVos136(rawBody);
                    const fetchUpdateMappingGW = async (name) => {
                        const newMappingGW = await deleteMappingGateway136(name);
                        return newMappingGW;
                    }
                    const response = await fetchUpdateMappingGW(name);
                    resolve([response, null]);
                    break;
                default:
                    break;
            }
        })

        const logFolder = path.join('./logs/DeleteMappingGW');
        const logFilePath = path.join(logFolder, `deleteMappingGW.txt`);

        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, { recursive: true });
        }

        fs.appendFileSync(logFilePath, `${new Date().toISOString()} - Delete nameMappingGateway:${name}\n | DataBK: ${JSON.stringify(dataBK)}\n`);

        return res.status(200).json({ status: "success", message: "Delete MappingGW thành công", data: dataBK });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Delete MappingGW thất bại", data: error.message });
    }
}
/////

export const updateFeeAccountVos = async (req, res) => {
    const queryField = "money";
    const table = "e_customer";
    const ipVos = req.query.ipVos;
    const listAccount = req.body.listAccount;
    const id = listAccount.map((e) => { return e.id }).toString();
    const account = listAccount.map((e => { return e.account }));
    try {
        const [rows, fields] = await new Promise(async (resolve, reject) => {
            switch (ipVos) {
                case "101.99.5.68":
                    dbConnectionMysqlVos568.query(
                        `UPDATE ${table} SET ${queryField} = 0 WHERE id in (${id})`,
                        (err, rows, fields) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve([rows, fields]);
                        }
                    );
                    break;
                case "101.99.5.65":
                    dbConnectionMysqlVos565.query(
                        `UPDATE ${table} SET ${queryField} = 0 WHERE id in (${id})`,
                        (err, rows, fields) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve([rows, fields]);
                        }
                    );
                    break;
                case "101.99.1.36":
                    const readInfoAccount = async (account) => {
                        const fetchDataAcc = await getFeeAccountVos136(account);
                        return fetchDataAcc.map((e) => ({ account: e.account, money: e.money * (-1) }));
                    };

                    const resetMoneyAccount = async (account, money) => {
                        return await payFeeAccountVos136(account, money);
                    };
                    const accountsInfo = await readInfoAccount(account);
                    const resetPromises = accountsInfo.map(({ account, money }) => resetMoneyAccount(account, money));
                    const resultReset = await Promise.all(resetPromises);
                    resolve([resultReset, null]);
                    break;
                default:
                    return res.status(404).json({ status: "fail", message: "Không nhận được thông tin VOS" });
            }

        });
        return res.status(200).json({ status: "success", message: "Reset cước thành công", data: rows });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Lấy list account thất bại", data: error.message });
    }
}

export const updateVos3000d = async (req, res) => {
    const ipVos = req.query.ipVos;
    try {
        const actionRestart = restartVos3000d(ipVos);
        return res.status(200).json({ status: "success", message: "Update Vos3000d thành công", data: actionRestart });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Update Vos3000d thất bại", data: error.message });
    }
}