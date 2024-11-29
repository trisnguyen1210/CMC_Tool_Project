import ReceiverMailModel from "../Models/ReceiverMail.model.js";
import WarningFeeVosModel from "../Models/WarningFeeVos.model.js";
import { sendAlertEmail } from "../services/nodemailer.js";

export const sendMailFeeVos = async (listWarning, ipVos) => {
    const checkDB = await WarningFeeVosModel.find({ account: { $in: listWarning } }, { _id: 0, account: 1, percent: 1, statusWarning: 1, money: 1, limitmoney: 1, ipServer: 1 });
    const receiver = await ReceiverMailModel.findOne({ reason: "feeVOS" })
    checkDB.map(async e => {
        let flag = false;
        let contentHeader = `Cảnh báo cước`;
        let subject = `Cảnh báo cước hệ thống`;
        switch (e.ipServer) {
            case "101.99.5.68":
                contentHeader = contentHeader + ` VOS Quốc tế 5.68 ` + `Time: ${new Date()}`;
                subject = subject + ` VOS quốc tế IP 101.99.5.68`;
                break;
            case "101.99.5.65":
                contentHeader = contentHeader + ` VOS VBrandName 5.65 ` + `Time: ${new Date()}`;
                subject = subject + ` VOS VBrandName IP 101.99.5.65`;
                break;
            case "101.99.1.36":
                contentHeader = contentHeader + ` VOS CTel 1.36 ` + `Time: ${new Date()}`;
                subject = subject + ` VOS CTel IP 101.99.1.36`;
                break;
        }
        let content = "";
        if (e.percent >= 98 && e.statusWarning === "over100") {
            return;
        } else if (e.percent >= 98 && e.statusWarning === "over80") {
            flag = true;
            content = content + `<br>Đã hết cước:
                <br>Account: ${e.account},
                <br>Current Value: ${e.money.toLocaleString()},
                <br>Maximum Value: ${e.limitmoney.toFixed(3).toLocaleString()},
                <br>Warning: ${Math.round(e.percent)}%`
            await WarningFeeVosModel.findOneAndUpdate({ account: e.account, ipServer: ipVos }, { $set: { statusWarning: "over100" } })
        } else if (e.percent >= 80 && e.statusWarning === "over80") {
            return;
        } else if (e.percent >= 80 && e.statusWarning === "over100") {
            await WarningFeeVosModel.findOneAndUpdate({ account: e.account, ipServer: ipVos }, { $set: { statusWarning: "over80" } })
            return;
        }
        else if (e.percent >= 80 && e.statusWarning === "none") {
            flag = true;
            content = content + `<br>Gần hết cước:
                <br>Account: ${e.account},
                <br>Current Value: ${e.money.toLocaleString()},
                <br>Maximum Value: ${e.limitmoney.toFixed(3).toLocaleString()},
                <br>Warning: ${Math.round(e.percent)}%`;
            await WarningFeeVosModel.findOneAndUpdate({ account: e.account, ipServer: ipVos }, { $set: { statusWarning: "over80" } })
        }

        const listReceiverString = receiver.listReceiver.toString();
        try {
            if (flag) {
                const sendMailToAgent = await sendAlertEmail(listReceiverString, subject, contentHeader, content);
                if (sendMailToAgent) { console.log("Gửi mail thành công"); }
            }
        } catch (error) {
            console.log("Gửi mail thất bại");
        }

    })
};
