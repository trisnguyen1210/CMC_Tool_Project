import _ from "lodash";
import { getCurrentCallVos136 } from "../services/ConnectVos136/index.js";

export const reportEventCurrentCallVos136 = async (data) => {
    const ipSearch = data.ipSearch;
    try {
        let result;
        switch (ipSearch) {
            case "101.99.1.36":
                result = await getCurrentCallVos136();
                break;
            default:
                break;
        }
        const now = new Date();
        const nameTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        const lengthResult = result.length;
        const groupedDataByMappingGW = _.groupBy(result, 'callerGatewayId');
        const countedDataByMappingGW = _.map(groupedDataByMappingGW, (items, key) => ({
            callerGatewayId: key,
            count: items.length
        }));

        const listData = { nameTime, length: lengthResult, groupByMappingGW: countedDataByMappingGW }
        const response = { status: "success", message: "EventSocket update CC", listData }
        return response;
    } catch (error) {
        console.log(error);
    }
}