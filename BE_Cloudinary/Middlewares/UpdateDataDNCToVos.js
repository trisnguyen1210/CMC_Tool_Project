import { addLimitE164, deleteLimitE164 } from "../services/ConnectVos136/index.js";

export default async function updateDataDNCVos(ipVos, number, action, dateMemo) {
    const date = new Date();
    let rawBody;
    let result;

    const attemptAction = async (actionFunction, body) => {
        let attempts = 0;
        const maxAttempts = 3; // Số lần thử tối đa
        const delay = 3000; // Thời gian delay (3 giây)
        while (attempts < maxAttempts) {
            try {
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
        if (!action.toUpperCase().includes("S")) {
            if (action.toUpperCase().includes("HUY")) {
                rawBody = `{"limitE164GroupName":"DNC","e164s":["${number}"]}`;
                result = await attemptAction(deleteLimitE164, rawBody);
            }
            else if (action.toUpperCase().includes("DK")) {
                rawBody = `{"limitE164GroupName": "DNC", "infoLimitE164s": [{ "e164": "${number}","memo":"${dateMemo}" }]}`;
                result = await attemptAction(addLimitE164, rawBody);
            } else {
                console.log("recheck update DNC");
                throw new Error("Invalid action provided for DNC update.");
            }
            return result;
        }
    } catch (error) {
        console.log(`Error updateDataDNCVOS time: ${date}\n`, error.message, error.stack);
        return false;
    }
}