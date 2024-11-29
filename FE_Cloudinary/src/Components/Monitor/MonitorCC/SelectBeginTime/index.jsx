import { DatePicker, Space, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeBegin } from "../../../../slices/callCurrentVosSlice";

export default function SelectBeginTime() {
    const dispatch = useDispatch();
    const datetime = useSelector(state => state.callCurrentVos.timeBegin);

    const onChangeDate = (date, dateString) => {
        const newDatetime = { ...datetime, date: dateString };
        dispatch(updateTimeBegin(newDatetime));
    };

    const onChangeTime = (time, timeString) => {
        const newDatetime = { ...datetime, time: timeString };
        dispatch(updateTimeBegin(newDatetime));
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