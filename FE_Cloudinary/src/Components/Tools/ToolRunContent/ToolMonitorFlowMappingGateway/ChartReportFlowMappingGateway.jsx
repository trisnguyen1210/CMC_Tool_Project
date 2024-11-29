import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area } from 'recharts';
import { setResetToolMFGateway } from '../../../../slices/toolMFGatewaySlice';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function ChartReportFlowMappingGateway() {
    const dispatch = useDispatch();

    const data = useSelector(state => state.toolMFGateway.dataFlowMappingGW);

    const formmatedData = data.map(item => {
        const date = new Date(item.createdAt).toLocaleString(); // Định dạng lại ngày tháng nếu cần
        const formattedItem = { createdAt: date };
        _.forOwn(item.groupByMappingGW, (value, key) => {
            formattedItem[key] = value;
        });
        return formattedItem;
    });

    const maxData = _.maxBy(formmatedData, obj => {
        const values = _.values(_.omit(obj, 'createdAt'));
        return _.max(values);
    });

    // Tìm khóa có giá trị lớn nhất trong object
    const maxKey = _.findKey(_.omit(maxData, 'createdAt'), value => value === _.max(_.values(_.omit(maxData, 'createdAt'))));

    // Tạo object mới với khóa countMax thay cho khóa có giá trị lớn nhất
    const updatedMaxData = _.mapKeys(maxData, (value, key) => {
        return key === maxKey ? 'countMax' : key;
    });
    console.log(updatedMaxData);

    const allKeys = _.uniq(_.flatMap(data, item => Object.keys(item.groupByMappingGW)));
    const colorMap = allKeys.reduce((acc, key) => {
        acc[key] = getRandomColor();
        return acc;
    }, {});

    const formatXAxisTick = (tickItem) => {
        const dateTimeParts = tickItem.split(' ');
        const timePart = dateTimeParts[1].substring(0, 5);
        return timePart;
    };

    useEffect(() => {
        return () => {
            dispatch(setResetToolMFGateway());
        }
    }, [])
    return (
        <>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    width={500}
                    height={200}
                    data={formmatedData}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" tickFormatter={formatXAxisTick} />
                    <YAxis />
                    <ReferenceLine x={updatedMaxData.createdAt} stroke="red" label="Time" />
                    <ReferenceLine y={updatedMaxData.countMax} stroke="red" label="Call" />
                    <Tooltip />
                    {allKeys.map(key => (
                        <Area key={key} type="monotone" dataKey={key} stroke={colorMap[key]} fill={colorMap[key]} />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}

