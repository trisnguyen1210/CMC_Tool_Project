import { DatePicker, Space, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeEnd } from "../../../../slices/callCurrentVosSlice";

export default function SelectBeginTime() {
    const dispatch = useDispatch();
    const datetime = useSelector(state => state.callCurrentVos.timeEnd);

    const onChangeDate = (date, dateString) => {
        const newDatetime = { ...datetime, date: dateString };
        dispatch(updateTimeEnd(newDatetime));
    };

    const onChangeTime = (time, timeString) => {
        const newDatetime = { ...datetime, time: timeString };
        dispatch(updateTimeEnd(newDatetime));
    };

    return (
        <>
            <div style={{ display: "flex", alignContent: "center", alignItems: "center", gap: 5, padding: "20px 20px 0px 20px" }}>
                <p>Set begin time</p>
                <Space direction="vertical">
                    <div>
                        <DatePicker onChange={onChangeDate} changeOnScroll needConfirm={false} />
                        <TimePicker onChange={onChangeTime} changeOnScroll needConfirm={false} />
                    </div>
                </Space>
            </div>
        </>
    )
}