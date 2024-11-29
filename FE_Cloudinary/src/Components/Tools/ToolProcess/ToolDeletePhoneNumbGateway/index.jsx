import { Steps } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorProcess, nextProcess, resetProcess } from "../../../../slices/processSlice";
import { stepProcessDeleteNumbGateway } from "../hardData";
import { deleteMappingGW, updateMappingGW } from "../../../../services/axios";
import _ from 'lodash';
import { resetToolDeletePhoneNumberGateway } from "../../../../slices/toolCPNGatewaySlice";

export default function ToolProcessDeleteNumbGateway() {
    const dispatch = useDispatch();
    const { processValue, processTotal, isError } = useSelector((state) => state.process);
    const { resultSearch, ipSearch } = useSelector((state) => state.toolCPNGateway);
    const { stepValue } = useSelector((state) => state.step)

    const modifyMappingGW = async (name, filteredPrefixesString, ipSearch) => {
        try {
            const response = await updateMappingGW(name, filteredPrefixesString, ipSearch);
            return response.data;
        } catch (error) {
            console.error("Error updating databases:", error);
            throw error;
        }
    };
    useEffect(() => {
        const handleNextStep = async () => {
            switch (processValue) {
                case 0:
                    resultSearch.length === 0 ? dispatch(errorProcess()) : dispatch(nextProcess());
                    break;
                case 1:
                    try {
                        const promises = resultSearch.map(async (e) => {
                            const prefixesArray = e.prefixes.split(',');
                            const findKeyArray = e.findKey.split(',');
                            if (prefixesArray.length === findKeyArray.length) {
                                await deleteMappingGW(e.name, ipSearch);
                            } else {
                                const uniqueInCalloutCallerPrefixes = _.difference(prefixesArray, findKeyArray);
                                await modifyMappingGW(e.name, uniqueInCalloutCallerPrefixes, ipSearch);
                            }
                        });
                        await Promise.all(promises);
                        dispatch(nextProcess());
                    } catch (error) {
                        dispatch(errorProcess());
                    }
                    break;
                default:
                    break;
            }
            if (processTotal === processValue) {
                dispatch(nextProcess());
            }
        };
        if (ipSearch != "101.99.1.36") {
            dispatch(errorProcess());
        } else {
            handleNextStep();
        }
    }, [processValue]);
    useEffect(() => {
        return () => {
            dispatch(resetProcess());
            dispatch(resetToolDeletePhoneNumberGateway());
        }
    }, [stepValue])
    return (
        <Steps
            progressDot
            current={processValue}
            direction="vertical"
            status={isError ? "error" : ""}
            items={stepProcessDeleteNumbGateway}
        />
    );
}