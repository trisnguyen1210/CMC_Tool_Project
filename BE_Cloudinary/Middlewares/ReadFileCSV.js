import BackupDNCModel from '../Models/BackupDNC.model.js';
import { getNumberInLimitE164 } from '../services/ConnectVos136/index.js';
import updateDataDNCVos from './UpdateDataDNCToVos.js';

export async function readCSVFromBottom(req, res, next) {
    try {
        let hasMoreData = true;

        while (hasMoreData) {
            await new Promise(resolve => setTimeout(resolve, 500));

            const getDataBKDNC = await BackupDNCModel.findOne({
                status: null
            }).sort({ id: -1 });

            if (getDataBKDNC) {
                // console.log(getDataBKDNC);
                const actionCheck = await checkDataVOSDNC(getDataBKDNC.e164.replace(new RegExp('^84'), '0'));
                console.log(getDataBKDNC.id);
                if (actionCheck.status === 0) {
                    const statusUpdate = await updateDataDNCVos("101.99.1.36", getDataBKDNC.e164.replace(new RegExp('^84'), '0'), "DK", getDataBKDNC.memo.split(' ')[0].replaceAll('/', '.'));
                    console.log(statusUpdate);
                }
                const updateBK = await BackupDNCModel.findOneAndUpdate({ id: getDataBKDNC.id }, { status: "checked" });
                // Cập nhật status để không check lại record này
            } else {
                hasMoreData = false;
            }
        }

        next();
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function readCSVFromTop(req, res, next) {
    try {
        let hasMoreData = true;

        while (hasMoreData) {
            await new Promise(resolve => setTimeout(resolve, 500));

            const getDataBKDNC = await BackupDNCModel.findOne({
                status: null
            }).sort({ id: 1 });

            if (getDataBKDNC) {
                // console.log(getDataBKDNC);
                const actionCheck = await checkDataVOSDNC(getDataBKDNC.e164.replace(new RegExp('^84'), '0'));
                console.log(getDataBKDNC.id);
                if (actionCheck.status === 0) {
                    const statusUpdate = await updateDataDNCVos("101.99.1.36", getDataBKDNC.e164.replace(new RegExp('^84'), '0'), "DK", getDataBKDNC.memo.split(' ')[0].replaceAll('/', '.'));
                    console.log(statusUpdate);
                }
                const updateBK = await BackupDNCModel.findOneAndUpdate({ id: getDataBKDNC.id }, { status: "checked" });
                // Cập nhật status để không check lại record này
            } else {
                hasMoreData = false;
            }
        }

        next();
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        res.status(500).json({ error: error.message });
    }
}

export const checkDataVOSDNC = async (number) => {
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
        return { status, message };
    } catch (error) {
        throw error;
    }
}