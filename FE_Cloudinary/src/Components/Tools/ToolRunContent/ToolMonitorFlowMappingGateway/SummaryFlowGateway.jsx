import { Card } from "antd";
import { useSelector } from "react-redux";
import './style.css';
import TableDataSummaryFlowGW from "./TableDataSummaryFlowGW";
import { useEffect, useState } from "react";

export default function SummaryFlowGateway() {
    const useTab = useSelector(state => state.toolMFGateway.useTab);
    const dataFlowMappingGWByDay = useSelector(state => state.toolMFGateway.dataFlowMappingGWByDay);
    const dataFlowMappingGWByWeek = useSelector(state => state.toolMFGateway.dataFlowMappingGWByWeek);
    const dataFlowMappingGWByMonth = useSelector(state => state.toolMFGateway.dataFlowMappingGWByMonth);
    const dataFlowMappingGWByQuarter = useSelector(state => state.toolMFGateway.dataFlowMappingGWByQuarter);
    const dataFlowMappingGWByYear = useSelector(state => state.toolMFGateway.dataFlowMappingGWByYear);
    const [value, setValue] = useState([]);

    useEffect(() => {
        switch (useTab) {
            case '2':
                setValue(dataFlowMappingGWByDay);
                break;
            case '3':
                setValue(dataFlowMappingGWByWeek);
                break;
            case '4':
                setValue(dataFlowMappingGWByMonth);
                break;
            case '5':
                setValue(dataFlowMappingGWByQuarter);
                break;
            case '6':
                setValue(dataFlowMappingGWByYear);
                break;
            default:
                setValue([]);
                break;
        }
    }, [useTab, dataFlowMappingGWByDay, dataFlowMappingGWByWeek, dataFlowMappingGWByMonth, dataFlowMappingGWByQuarter, dataFlowMappingGWByYear]);

    const formattedSnapTime = (snapTime) => {
        if (!snapTime) return '';
        let dateObj = new Date(snapTime);
        dateObj.setHours(dateObj.getHours() + 7);
        return dateObj.toLocaleString();
    };

    const formattedValue = value.map((item, index) => ({
        ...item,
        index: index + 1,// Assuming you want 1-based index, change to index if you want 0-based
        snapTime: formattedSnapTime(item.snapTime)
    }));

    const maxValue = formattedValue.length > 0 ? formattedValue[0] : { name: '', count: 0, snapTime: '' };
    return (
        <>
            <div className="tool_card_MFGateway">
                <Card title="Ngưỡng cao nhất" className="tool_card_MFGateway_header">
                    <Card.Grid className="tool_card_MFGateway_item">
                        <p className="tool_card_MFGateway_title">Tên GW cao nhất</p>
                        <p className="tool_card_MFGateway_content">{value.length > 0 ? maxValue.name : 0}</p>
                    </Card.Grid>
                    <Card.Grid className="tool_card_MFGateway_item">
                        <p className="tool_card_MFGateway_title">Lượng gọi tối đa</p>
                        <p className="tool_card_MFGateway_content">{value.length > 0 ? maxValue.count : 0}</p>
                    </Card.Grid>
                    <Card.Grid className="tool_card_MFGateway_item">
                        <p className="tool_card_MFGateway_title">Thời điểm cao nhất</p>
                        <p className="tool_card_MFGateway_content">{value.length > 0 ? `${maxValue.snapTime}` : 0}</p>
                    </Card.Grid>
                </Card>
            </div>
            <TableDataSummaryFlowGW listData={formattedValue} />
        </>
    )
}