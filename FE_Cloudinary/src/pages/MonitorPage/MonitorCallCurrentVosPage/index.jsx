import ButtonResetPointer from "../../../Components/Monitor/MonitorCC/ButtonResetPointer";
import DashboardCCVos136 from "../../../Components/Monitor/MonitorCC/DashboardCCVos136/DashboardCCVos136";
import DashboardCCMappingGWVos136 from "../../../Components/Monitor/MonitorCC/DashboardCCVos136/DashboardCCMappingGWVos136"
import SelectBeginTime from "../../../Components/Monitor/MonitorCC/SelectBeginTime";
import SelectTimeInterval from "../../../Components/Monitor/MonitorCC/SelectTimeInterval";
import { useDispatch } from "react-redux";
import SelectEndTime from "../../../Components/Monitor/MonitorCC/SelectEndTime";

export default function MonitorCurrentCallVosPage() {
    return (
        <>
            <div style={{ width: "100%" }}>
                <SelectBeginTime />
                <SelectEndTime />
                <SelectTimeInterval />
                < hr />
                <div style={{ width: "100%" }}>
                    <h2>Biểu đồ CC của VOS136</h2>
                    <DashboardCCVos136 />
                </div>
                <hr />
                <div style={{ width: "100%", height: 600 }}>
                    <h2>Biểu đồ MappingGW ứng với thời điểm</h2>
                    <ButtonResetPointer context={"Realtime"} />
                    <DashboardCCMappingGWVos136 />
                </div>
            </div >
        </>

    )
}