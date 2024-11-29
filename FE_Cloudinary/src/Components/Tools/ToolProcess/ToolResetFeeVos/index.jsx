import { Steps } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorProcess, nextProcess, resetProcess } from "../../../../slices/processSlice";
import { resetFeeVos, updateVos3000d } from "../../../../services/axios";
import { stepProcessResetFeeVos } from "../hardData";

export default function ToolProcessResetFeeVos() {
    const dispatch = useDispatch();
    const { processValue, processTotal, isError } = useSelector((state) => state.process);
    const { stepValue } = useSelector((state) => state.step)
    const ipVos = useSelector((state) => state.accountVos.pickServer);

    const dataListAccount = useSelector((state) => state.accountVos.listAccount);
    const dataPickAccount = useSelector((state) => state.accountVos.pickAccount);
    const filteredAccount = dataListAccount.filter((account) =>
        dataPickAccount.includes(account.account)
    );

    const updateDatabases = async (ipVos, listAccount) => {
        try {
            const response = await resetFeeVos(ipVos, listAccount);
            return response.data;
        } catch (error) {
            console.error("Error updating databases:", error);
            throw error;
        }
    };

    const updateVOS = async () => {
        try {
            const response = await updateVos3000d(ipVos);
            return response.data;
        } catch (error) {
            console.error("Error updating VOS:", error);
            throw error;
        }
    };

    useEffect(() => {
        const handleNextStep = async () => {
            switch (processValue) {
                case 0:
                    dataPickAccount.length === 0 ? dispatch(errorProcess()) : dispatch(nextProcess());
                    break;
                case 1:
                    try {
                        await updateDatabases(ipVos, filteredAccount);
                        dispatch(nextProcess());
                    } catch (error) {
                        dispatch(errorProcess());
                    }
                    break;
                case 2:
                    try {
                        if (ipVos === "101.99.1.36") {
                            dispatch(nextProcess());
                        } else {
                            await updateVOS(ipVos);
                            dispatch(nextProcess());
                        }
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
        handleNextStep();
    }, [processValue]);
    useEffect(() => {
        return () => {
            dispatch(resetProcess());
        }
    }, [stepValue])
    return (
        <Steps
            progressDot
            current={processValue}
            direction="vertical"
            status={isError ? "error" : ""}
            items={stepProcessResetFeeVos}
        />
    );
}