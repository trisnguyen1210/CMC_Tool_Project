import axios from "axios";

const tokenAuth = localStorage.getItem("token") || null;

const instanceAxios = axios.create({
    baseURL: "http://10.1.199.176:3002/",
    headers: {
        Authorization: `Bearer ${tokenAuth}`,
    },
});

//Post
////Login
export const login = async (username, password) => {
    const response = await instanceAxios.post(`api/users/login`, { username, password });
    return response.data;
};

export const createNewMonitoring = async (formData) => {
    const response = await instanceAxios.post(`api/monitoring/create/newServer`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const uploadFile = async (formData) => {
    const response = await instanceAxios.post(`api/uploadFile`, formData);
    return response.data;
};

export const tryGetUser = async () => {
    const response = await instanceAxios.get(`api/users/getUser`);
    return response.data;
};

export const readFeeVos = async (ipVos) => {
    const response = await instanceAxios.get(`api/VOS/feeVos`, {
        params: { ipVos: ipVos, },
    });
    return response.data;
};

export const getToolsList = async () => {
    const response = await instanceAxios.get(`api/tools/getList`);
    return response.data;
};

export const getAccountVos = async (ipVos) => {
    const response = await instanceAxios.get(`api/VOS/read/accountVos`, { params: { ipVos: ipVos, }, });
    return response.data;
};

export const resetFeeVos = async (ipVos, listAccount) => {
    const response = await instanceAxios.post("api/VOS/update/resetFeeVos", { listAccount: listAccount }, { params: { ipVos: ipVos } });
    return response.data;
};

export const updateVos3000d = async (ipVos) => {
    const response = await instanceAxios.post("api/VOS/update/vos3000d", {}, { params: { ipVos: ipVos }, });
    return response.data;
};

export const readInfoNumberGateway = async (ipSearch, inputSearch, tableSearch) => {
    const response = await instanceAxios.get("api/VOS/read/numberGateway", { params: { ipSearch: ipSearch, inputSearch: inputSearch, tableSearch: tableSearch }, });
    return response.data;
};

export const readCurrentCallVos = async (ipSearch, options) => {
    const response = await instanceAxios.get("api/monitoring/read/reportCurrentCall", { params: { ipSearch: ipSearch, options: options } });
    return response.data;
}

export const readListNameMappingGW = async (ipSearch) => {
    const response = await instanceAxios.get("api/VOS/read/listNameMappingGateway", { params: { ipSearch: ipSearch } });
    return response.data
}

export const readFlowDataMappingGW = async (type, ipSearch, listNameGW, timeString) => {
    console.log(timeString);
    const response = await instanceAxios.get("api/VOS/read/dataFlowMappingGateway", { params: { type, ipSearch, listNameGW, timeString } });
    return response.data
}

export const updateMappingGW = async (name, filteredPrefixesString, ipVos) => {
    const response = await instanceAxios.put("api/VOS/update/numberMappingGateway", { name, filteredPrefixesString }, { params: { ipVos: ipVos } })
    return response.data;
}

export const deleteMappingGW = async (name, ipVos) => {
    const response = await instanceAxios.delete("api/VOS/delete/numberMappingGateway", { params: { ipVos: ipVos, name: name } })
    return response.data;
}

export const getDataDNC = async (ipVos) => {
    const response = await instanceAxios.get("api/VOS/read/listDNC", { params: { ipVos: ipVos } })
    return response.data;
}
