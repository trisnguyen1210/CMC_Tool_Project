import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataCurrentCall, resetData, updateCurrentCall, updateDataGroupByMappingGW, updatePointer } from "../../../../slices/callCurrentVosSlice";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { connSocket } from '../../../../services/socket'
import _, { throttle } from "lodash";

export default function DashboardCCVos136() {
    const dispatch = useDispatch();

    const currentCall = useSelector(state => state.callCurrentVos.data);
    const timeBegin = useSelector(state => state.callCurrentVos.timeBegin);
    const timeEnd = useSelector(state => state.callCurrentVos.timeEnd);

    const timeInterval = useSelector(state => state.callCurrentVos.timeInterval);
    const pointer = useSelector(state => state.callCurrentVos.pointer);

    const [socket, setSocket] = useState(null);

    const throttledMouseMove = useCallback(throttle((state) => {
        if (state.isTooltipActive) {
            const data = state.activePayload[0].payload;
            dispatch(updatePointer(data));
            dispatch(updateDataGroupByMappingGW(data.groupByMappingGW));
        }
    }, 100), [dispatch]);

    useEffect(() => {
        if (timeBegin.date !== "" && timeBegin.time !== "") {
            const timeBeginString = `${timeBegin.date} ${timeBegin.time}`;
            const timeEndString = `${timeEnd.date} ${timeEnd.time}`;
            dispatch(getDataCurrentCall({ ipSearch: "101.99.1.36", options: { timeBegin: timeBeginString, timeEnd: timeEndString } }))
        } else {
            dispatch(resetData());
        }
    }, [timeBegin, timeEnd]);

    useEffect(() => {
        const newSocket = connSocket();
        setSocket(newSocket);

        const fetchData = () => {
            newSocket.emit('clientMessage', { ipSearch: "101.99.1.36", reason: "CurrentCall" });
        };
        fetchData();

        const intervalFetchData = setInterval(fetchData, timeInterval);

        return () => {
            clearInterval(intervalFetchData);
            newSocket.disconnect();
        };
    }, [timeInterval]);

    useEffect(() => {
        if (socket) {
            socket.on('serverMessage', (data) => {
                dispatch(updateCurrentCall(data.listData));
                if (pointer === "") {
                    dispatch(updateDataGroupByMappingGW(data.listData.groupByMappingGW));
                }
            });
            return () => {
                socket.off('serverMessage');
            };
        }
    }, [pointer, socket, dispatch]);


    if (currentCall.length !== 0) {
        const listData = currentCall;
        const maxData = _.maxBy(listData, 'length');
        const formatXAxisTick = (tickItem) => {
            const dateTimeParts = tickItem.split(' ');
            const timePart = dateTimeParts[1].substring(0, 5);
            return timePart;
        };

        return (
            <>
                <ResponsiveContainer width="95%" height={400}>
                    <LineChart data={listData} onMouseMove={throttledMouseMove}>
                        <CartesianGrid strokeDasharray={"3 3"} />
                        <XAxis dataKey={"nameTime"} tickFormatter={formatXAxisTick} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <ReferenceLine x={maxData.nameTime} stroke="red" label="Time" />
                        <ReferenceLine y={maxData.length} stroke="red" label="Call" />
                        <Line type="monotone" dataKey="length" stroke="#82ca9d" name="Call Current" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    } else {
        return (
            <p>Loading....</p>
        )
    }

}