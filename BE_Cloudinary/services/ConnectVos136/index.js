export const getListAccountVos136 = async () => {
    const raw = "{\"type\":0}";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/GetAllCustomers", requestOptions);
    const result = await response.text();
    return JSON.parse(result).accounts; // Chuyển đổi văn bản thành đối tượng JSON và trả về 'accounts'
};

export const getAccountVos136 = async (body) => {
    const raw = `{ "accounts":[${body}] }`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/GetCustomer", requestOptions);
    const result = await response.text();
    return JSON.parse(result).infoCustomers; // Chuyển đổi văn bản thành đối tượng JSON và trả về 'accounts'
}

export const getFeeAccountVos136 = async (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const raw = `{\"accounts\":[${body}]}\r\n`;
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/GetCustomer", requestOptions);
    const result = await response.text();
    const formatRes = JSON.parse(result).infoCustomers;
    const end = formatRes.map((e) => { return { account: e.account, name: e.name, money: e.money, limitmoney: e.limitMoney, starttime: e.startTime, validtime: e.validTime, lastupdatetime: e.startTime } });
    return end;
};

export const getMappingGatewayVos136 = async (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: body,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/GetGatewayMapping", requestOptions);
    const result = await response.text();
    return JSON.parse(result).infoGatewayMappings;
}

export const getRoutingGatewayVos136 = async (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: body,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/GetGatewayRouting", requestOptions);
    const result = await response.text();
    return JSON.parse(result).infoGatewayRoutings;
}


export const getCurrentCallVos136 = async () => {
    const raw = "{}";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/GetCurrentCall", requestOptions);
    const result = await response.text();
    return JSON.parse(result).infoCurrentCalls;
}

export const payFeeAccountVos136 = async (account, money) => {
    const raw = `{"ownerName":"${account}","ownerType":2,"money":${money}}`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/Pay", requestOptions);
    const result = await response.text();
    return JSON.parse(result); // Chuyển đổi văn bản thành đối tượng JSON và trả về 'accounts'
}

export const updateMappingGateway136 = async (name, calloutCallerPrefixes) => {
    const raw = `{"name":"${name}","calloutCallerPrefixes":"${calloutCallerPrefixes}"}`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/ModifyGatewayMapping", requestOptions);
    const result = await response.text();
    return JSON.parse(result).infoGatewayMappings;
}

export const deleteMappingGateway136 = async (name) => {
    const raw = `{"name":"${name}"}`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch("http://101.99.1.36:8760/external/server/DeleteGatewayMapping", requestOptions);
    const result = await response.text();
    return JSON.parse(result);
}

export const getLimitE164 = async (name) => {
    try {
        const raw = `{"limitE164GroupName":"${name}"}`;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/html");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const response = await fetch("http://101.99.1.36:8760/external/server/GetLimitE164", requestOptions);
        const result = await response.text();
        return JSON.parse(result).infoLimitE164s;
    } catch (error) {
        const date = new Date();
        console.log("Error when getting limit E164", date, raw);
        throw error;
    }

}

export const getNumberInLimitE164 = async (rawBody) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/html");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: rawBody,
            redirect: "follow"
        };
        const response = await fetch("http://101.99.1.36:8760/external/server/GetLimitE164", requestOptions);
        const result = await response.text();
        return JSON.parse(result).infoLimitE164s;
    } catch (error) {
        const date = new Date();
        console.error('Error in addLimitE164:', date, rawBody);
        throw error;
    }
}

export const addLimitE164 = async (rawBody) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/html");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: rawBody,
            redirect: "follow"
        };
        const response = await fetch("http://101.99.1.36:8760/external/server/CreateLimitE164", requestOptions);
        const result = await response.text();
        return result;
    } catch (error) {
        const date = new Date();
        console.error('Error in addLimitE164:', date, rawBody);
        throw error;
    }
}

export const deleteLimitE164 = async (rawBody) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/html");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: rawBody,
            redirect: "follow"
        };
        const response = await fetch("http://101.99.1.36:8760/external/server/DeleteLimitE164", requestOptions);
        const result = await response.text();
        return result;
    } catch (error) {
        const date = new Date();
        console.error('Error in deleteLimitE164:', date, rawBody);
        throw error;
    }
}