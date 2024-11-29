import DNCVosGeneral from "../../../Components/Monitor/MonitorDNCVos/DNCVosGeneral";
import DNCVosTitle from "../../../Components/Monitor/MonitorDNCVos/DNCVosTitle";
import DNCVosContent from "../../../Components/Monitor/MonitorDNCVos/DNCVosContent";

export default function MonitorDNCPage() {
    return (
        <>
            <div>
                <DNCVosTitle />
                <DNCVosGeneral />
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                    <DNCVosContent />
                </div>
            </div>
        </>
    )
}