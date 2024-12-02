
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTools } from "../../../slices/toolSlice";
import { useNavigate } from "react-router-dom";
import './style.css';
import SearchBar from "../../SearchBar";
import { setSearchText } from "../../../redux/slices/tool.slice";
import { Typography ,Tag} from "antd";
import ListTable from "../../ListTable";

const { Title } = Typography;

export default function ToolListTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchText = useSelector(state => state.tool.searchText);
    const listTool = useSelector(state => state.tool.listTool);

    const handleSearch = (e) => {
        dispatch(setSearchText(e.target.value));
    };

    const handleRunTool = (toolPath) => {
        navigate(toolPath);
    };

    
    const columns = [
        {
            title: "Tool Name",
            dataIndex: "nameTool",
            key: "nameTool",
            sorter: (a, b) => a.nameTool.localeCompare(b.nameTool),
            render: (text, record) =>
                <Button
                    type="link"
                    onClick={() => navigate(`/tool/run/${record.key}`)}
                >
                    {text}
                </Button>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return (
                    <Tag color={status === "test" ? "green" : "red"}>
                        {status}
                    </Tag>
                );
            }
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            filters: [
                { text: "Monitoring", value: "monitoring" },
                { text: "Analysis", value: "analysis" }
            ],
            onFilter: (value, record) => record.category === value,
            render: (category) => {
                if (!category || !Array.isArray(category)) return null;

                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        {category.map((item, index) =>
                            <Tag color="blue" key={index}>
                                {item}
                            </Tag>
                        )}
                    </div>
                );
            }
        }
    ];

    return (
        <>
        <div className="tool-list-container">
            <div className="tool-list-header">
                <Title level={2}>Tool List</Title>
                <SearchBar placeholder="Search tool..." className="search-bar" allowClear searchText={searchText} onChange={handleSearch} />
            </div>
            <div>
                <ListTable listTool={listTool} searchText={searchText} className="tool-list-table" columns={columns} />
            </div>
        </div>
        </>
    );
}
