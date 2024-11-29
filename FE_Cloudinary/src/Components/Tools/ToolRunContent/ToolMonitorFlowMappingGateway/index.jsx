import SelectBeginTime from "../../../Monitor/MonitorCC/SelectBeginTime";
import SelectEndTime from "../../../Monitor/MonitorCC/SelectEndTime";
import ChartReportFlowMappingGateway from "./ChartReportFlowMappingGateway";
import InputSearchFlowGateway from "./InputSearchFlowGateway";
import ButtonCheck from "../../../Monitor/MonitorCC/ButtonCheck";
import { Tabs } from "antd";
import TimeSelect from "./TimeSelect";
import { setTimeSearch, setUseTab } from "../../../../slices/toolMFGatewaySlice";
import SummaryFlowGateway from "./SummaryFlowGateway";
import { useDispatch } from "react-redux";

export default function ToolMonitorCCMappingGateway() {
    const dispatch = useDispatch();

    const items = [
        {
            key: '1',
            label: 'Check tên MappingGW',
            children: (
                <>
                    <div style={{ padding: 10 }}>
                        <InputSearchFlowGateway />
                        <SelectBeginTime />
                        <SelectEndTime />
                        <ButtonCheck type={["date"]} />
                    </div>
                    <hr></hr>
                    <div style={{ height: "fit-content", width: "100%" }}>
                        <ChartReportFlowMappingGateway />
                    </div>
                </>
            ),
        },
        {
            key: '2',
            label: 'Tổng kết Ngày',
            children: (
                <>
                    <div style={{ padding: 10 }}>
                        <TimeSelect type={["day"]} updateFunction={setTimeSearch} />
                        <ButtonCheck type={["day"]} />
                    </div>
                    <hr></hr>
                    <div style={{ height: "fit-content", width: "100%" }}>
                        <SummaryFlowGateway />
                    </div>
                </>
            ),
        },
        {
            key: '3',
            label: 'Tổng kết tuần',
            children: (
                <>
                    <div style={{ padding: 10 }}>
                        <TimeSelect type={["week"]} updateFunction={setTimeSearch} />
                        <ButtonCheck type={["week"]} />
                    </div>
                    <hr></hr>
                    <div style={{ height: "fit-content", width: "100%" }}>
                        <SummaryFlowGateway />
                    </div>
                </>
            ),
        },
        {
            key: '4',
            label: 'Tổng kết tháng',
            children: (
                <>
                    <div style={{ padding: 10 }}>
                        <TimeSelect type={["month"]} updateFunction={setTimeSearch} />
                        <ButtonCheck type={["month"]} />
                    </div>
                    <hr></hr>
                    <div style={{ height: "fit-content", width: "100%" }}>
                        <SummaryFlowGateway />
                    </div>
                </>
            ),
        },
        {
            key: '5',
            label: 'Tổng kết quý',
            children: (
                <>
                    <div style={{ padding: 10 }}>
                        <TimeSelect type={["quarter"]} updateFunction={setTimeSearch} />
                        <ButtonCheck type={["quarter"]} />
                    </div>
                    <hr></hr>
                    <div style={{ height: "fit-content", width: "100%" }}>
                        <SummaryFlowGateway />
                    </div>
                </>),
        },
        {
            key: '6',
            label: 'Tổng kết năm',
            children: (
                <>
                    <div style={{ padding: 10 }}>
                        <TimeSelect type={["year"]} updateFunction={setTimeSearch} />
                        <ButtonCheck type={["year"]} />
                    </div>
                    <div style={{ height: "fit-content", width: "100%" }}>
                        <SummaryFlowGateway />
                    </div>
                </>),
        },
    ];
    const setTab = (e) => {
        dispatch(setUseTab(e));
    }
    return (
        <>
            <Tabs defaultActiveKey="1" type="card" size="large" items={items} onChange={setTab} />
        </>
    )
}