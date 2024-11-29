import FeeVosGeneralMonitor from "../../../Components/Monitor/MonitorFeeVos/FeeVosGeneralMonitor";
import FeeVosSearchBar from "../../../Components/Monitor/MonitorFeeVos/FeeVosSearchBar";
import FeeVosTable from "../../../Components/Monitor/MonitorFeeVos/FeeVosTable";
import FeeVosTitleMonitor from "../../../Components/Monitor/MonitorFeeVos/FeeVosTitleMonitor";
import "./style.css";

export default function MonitorFeeVosPage() {
    return (
        <>
            <div className="layout_MonitorFeeVos">
                <div className="layout_MonitorFeeVos_title">
                    <FeeVosTitleMonitor />
                    <FeeVosGeneralMonitor />
                </div>
                <div className="layout_MonitorFeeVos_searchbar">
                    <FeeVosSearchBar />
                </div>
                <div>
                    <FeeVosTable />
                </div>
            </div>
        </>
    );
}
