import _ from "lodash";
import ListMonitoringModel from "../Models/ListMonitoring.model.js";
import ReceiverMailModel from "../Models/ReceiverMail.model.js";
import WarningFeeVosModel from "../Models/WarningFeeVos.model.js";
import { getCurrentCallVos136 } from "../services/ConnectVos136/index.js";
import { sendAlertEmail } from "../services/nodemailer.js";
import CurrentCallVos136Model from "../Models/CurrentCallVos136.model.js";
import MaxCCVosModel from "../Models/MaxCCVos.model.js";

export const createNewServer = async (req, res) => {
    const ipServer = req.body.ipServer;
    const idReqUser = req.body.idReqUser;
    const nameServer = req.body.nameServer;

    try {
        const checkExitsIP = await ListMonitoringModel.findOne({ IP: ipServer });
        if (!checkExitsIP) {
            const authorityUser = [idReqUser];
            const data = {
                IP: ipServer,
                nameServer: nameServer,
                authorityUser: authorityUser,
                proposer: idReqUser,
            };
            const createNewServer = await ListMonitoringModel.create(data);
            return res
                .status(200)
                .json({ status: "success", message: "Thêm mới thành công", data: createNewServer });
        }
        return res
            .status(400)
            .json({ status: false, message: "Đã tồn tại IP", data: checkExitsIP });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Lỗi server và DB", data: error });
    }
};

export const CreateAddReceiverMail = async (req, res) => {
    const receiverMail = req.body.receiverMail;
    const reason = req.body.reason;

    let receiverMailArray;
    receiverMailArray = Array.isArray(receiverMail) ? receiverMail : [receiverMail];
    try {
        const updateAdd = await ReceiverMailModel.create({ reason, listReceiver: receiverMailArray });
        return res.status(200).json({ status: "success", message: "Thêm mới người nhận mail thành công", data: updateAdd });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Thêm mới người nhận mail xảy ra lỗi", data: error });
    }
}

export const reportLimitFee = async (req, res) => {
    const checkDB = await WarningFeeVosModel.find({}, { _id: 0, idAccount: -1, account: -1 });
    const receiver = await ReceiverMailModel.findOne({ reason: "feeVOS" });

    const content = `Danh sách các account bị khoá cước do quá hạn mức:\n${checkDB}`;
    const listReceiverString = receiver.listReceiver.toString();
    try {
        const sendMailToAgent = await sendAlertEmail(listReceiverString, content);
        if (sendMailToAgent) {
            return res.status(200).json({ status: "success", message: "Gửi mail thành công" });
        }
        else {
            return res.status(500).json({ status: "error", message: "Gửi mail thất bại" });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Gửi mail thất bại" });
    }
}

export const readCurrentCallVos136Schedule = async (req, res) => {
    const ipSearch = req.query.ipSearch;
    let response = [];
    switch (ipSearch) {
        case "101.99.1.36":
            const fetchCurrentCallVos136 = async () => {
                const infoCurrentCalls = await getCurrentCallVos136();
                return infoCurrentCalls;
            }
            response = await fetchCurrentCallVos136();
            break;
        case "101.99.5.68":
            const fetchCurrentCallVos568 = async () => {
                const infoCurrentCalls = await getCurrentCallVos136();
                return infoCurrentCalls;
            }
            response = await fetchCurrentCallVos568();
            break;
        default:
            return res.status(404).json({ status: "fail", message: "Không nhận được thông tin VOS" });
    }

    const now = new Date();
    const nameTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const lengthResponse = response.length;
    const groupedDataByMappingGW = _.groupBy(response, 'callerGatewayId');
    const countedDataByMappingGW = _.map(groupedDataByMappingGW, (items, key) => ({
        callerGatewayId: key,
        count: items.length
    }));
    try {
        const updateRealtime = await CurrentCallVos136Model.create({ nameTime, length: lengthResponse, groupByMappingGW: countedDataByMappingGW })

        // const regex = nameTime.split(' ')[0];
        const regex = nameTime.split(' ')[0];
        const filter = { nameTime: { $regex: regex } };

        // Sử dụng aggregation để nhóm và sắp xếp
        const queryMaxData = await CurrentCallVos136Model.aggregate([
            { $match: filter },
            { $unwind: "$groupByMappingGW" }, // Giải phóng mảng
            { $sort: { "groupByMappingGW.count": -1 } }, // Sắp xếp giảm dần theo count
            {
                $group: {
                    _id: "$groupByMappingGW.callerGatewayId",
                    name: { $first: "$groupByMappingGW.callerGatewayId" }, // Đổi tên _id thành name
                    count: { $first: "$groupByMappingGW.count" },
                    snapTime: { $first: "$createdAt" } // Sử dụng createdAt để lấy snapTime
                }
            },
            {
                $project: {
                    _id: 0, // Loại bỏ trường _id khỏi kết quả
                    name: 1,
                    count: 1,
                    snapTime: {
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M:%S", // Định dạng mong muốn của ngày tháng
                            date: "$snapTime" // Trường cần định dạng lại
                        }
                    }
                }
            },
            { $sort: { count: -1 } }
        ]);
        const updateMaxData = await MaxCCVosModel.findOneAndUpdate({ nameTime: nameTime.split(' ')[0] },
            { maxData: queryMaxData },
            { upsert: true, new: true });
        // Kiểm tra và xử lý lỗi hoặc thông báo thành công
        return res.status(200).json({ status: "success", data: updateRealtime, message: "update CC vos136" });
    } catch (error) {
        console.log(error);
    }
}

export const reportCurrentCalVos136 = async (req, res) => {
    const ipSearch = req.query.ipSearch;
    const timeBeginString = req.query.options.timeBegin;
    const timeEndString = req.query.options.timeEnd;
    let response = [];

    try {
        const timeBeginDate = new Date(timeBeginString);
        const timeEndDate = new Date(timeEndString);

        let queryCondition = { createdAt: {}, };
        if (timeBeginDate != "Invalid Date") {
            queryCondition.createdAt['$gt'] = timeBeginDate;
        };
        if (timeEndDate != "Invalid Date") {
            queryCondition.createdAt['$lt'] = timeEndDate;
        };

        // Nếu có tham số timeEndString, thêm điều kiện $lt vào query
        // if (timeEndString !== "") {
        //     queryCondition.createdAt['$lt'] = timeEndDate;
        // }
        // console.log(queryCondition);
        switch (ipSearch) {
            case "101.99.1.36":
                // const maxData = await CurrentCallVos136Model.aggregate([{ $sort: { length: -1 } }, { $limit: 1 }]);
                const listData = await CurrentCallVos136Model.find(queryCondition);
                response = listData;
                break;
            default:
                break;
        }
        // response = listData;
        return res.status(200).json({ status: "success", message: "Lấy data call curent thành công", data: response });
    } catch (error) {
        console.log(error);
    }
}