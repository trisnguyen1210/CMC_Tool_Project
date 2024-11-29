export const sendReportTelegram = async (messageBot, component) => {
    const message = `${messageBot}`;
    const urlTokenAPI =
        "https://api.telegram.org/bot7163702008:AAFCHX1DQBGMTP476FdwNn0vdGC_RgSl2GQ/sendMessage";
    const groudID = "-802219130";

    //POST API
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: groudID,
            text: message,
        }),
    };
    try {
        const response = await fetch(urlTokenAPI, options);
        const data = await response.json();
        if (data.ok) {
            console.log(`Send notification ${component}`);
        } else {
            console.log(`Send warning fail ${component}`);
        }
    } catch (error) {
        console.log(error);
    }
};

export const sendAlert = async (message) => {
    const urlTokenAPI = `https://api.telegram.org/bot6797435195:AAGemyl6nlU8W-oYuK77rME2V08YKExK1tM/sendMessage`;
    const groudID = "-4100139867";
    //POST API
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: groudID,
            text: message,
        }),
    };
    try {
        const response = await fetch(urlTokenAPI, options);
        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
    console.error("Alert:", message);
};