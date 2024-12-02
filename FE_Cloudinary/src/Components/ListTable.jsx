import { Table } from "antd";

export default function ListTable({ columns, listTool, className }) {
    if (!listTool || listTool.length === 0) {
        return <div>No tools available</div>; // Update message for clarity
    }

    return (
        <div className="tool-list-container">
            <Table
                columns={columns}
                dataSource={listTool}
                className={className}
                rowKey={record => record.key} // Ensure rowKey is correctly set
            />
        </div>
    );
}
