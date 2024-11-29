import React from 'react';
import { Table } from 'antd';
const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        width: "5%",
    },
    {
        title: 'Tên GW',
        dataIndex: 'name',
        width: "30%",
    },
    {
        title: 'Lượng gọi',
        dataIndex: 'count',
        width: "30%",
    },
    {
        title: 'Thời điểm',
        dataIndex: 'snapTime',
        width: "30%",
    },
];

const TableDataSummaryFlowGW = (props) => {
    const { listData } = props;

    return (
        <Table
            rowKey={"index"}
            columns={columns}
            dataSource={listData}
            scroll={{ y: 240 }}
            pagination={false}
        />
    )
};
export default TableDataSummaryFlowGW;