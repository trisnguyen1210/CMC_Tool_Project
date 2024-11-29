import _ from "lodash";
import { useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DashboardCCMappingGWVos136() {
    const groupByMappingGW = useSelector(state => state.callCurrentVos.dataGroupByMappingGW);
    const sortedData = _.orderBy(groupByMappingGW, ['count'], ['desc']);
    const limitedData = _.take(sortedData, 20);
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={limitedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="callerGatewayId" interval={0} angle={-45} textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}