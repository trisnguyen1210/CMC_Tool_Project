import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { readFlowDataMappingGWRedux } from "../../../../slices/toolMFGatewaySlice";

export default function ButtonCheck(props) {
    const { type } = props;
    const dispatch = useDispatch();

    const timeBegin = useSelector(state => state.callCurrentVos.timeBegin);
    const timeEnd = useSelector(state => state.callCurrentVos.timeEnd);
    const pickNameGW = useSelector(state => state.toolMFGateway.pickNameGW);
    const timeSearchString = useSelector(state => state.toolMFGateway.timeSearch);

    const handleCheck = () => {
        let timeString = "";
        if (type.includes("date")) {
            const timeBeginString = `${timeBegin.date} ${timeBegin.time}`;
            const timeEndString = `${timeEnd.date} ${timeEnd.time}`;
            timeString = { timeBeginString, timeEndString };
        }
        if (type.includes("day")) {
            timeString = timeSearchString.timeSearch;
        }
        if (type.includes("week") || type.includes("month") || type.includes("quarter") || type.includes("year")) {
            const timeBeginString = timeSearchString.timeSearch.split(' to ')[0];
            const timeEndString = timeSearchString.timeSearch.split(' to ')[1];
            timeString = { timeBeginString, timeEndString };
        }
        dispatch(readFlowDataMappingGWRedux({ type: type.toString(), ipSearch: "101.99.1.36", listNameGW: pickNameGW, timeString: timeString }));
    }

    return (
        <>
            <Button onClick={handleCheck}>
                Check
            </Button>
        </>
    )
}