import { useDispatch, useSelector } from "react-redux";
import { getListTools } from "../../slices/toolSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import ListTable from "../../Components/ListTable";
import { Typography, Tag, Button } from "antd";
import { setSearchText } from "../../redux/slices/tool.slice";
const { Title } = Typography;

export default function ToolListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchText = useSelector(state => state.tool.searchText);
    const listTool = useSelector(state => state.tool.listTool);

    const handleSearch = (e) => {
        dispatch(setSearchText(e.target.value));
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
                    onClick={() => navigate(`/tool/run/${record.slug}`)}
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
                { text: "Create", value: "Create" },
                { text: "Read", value: "Read" },
                { text: "Update", value: "Update" },
                { text: "Delete", value: "Delete" }
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

    useEffect(() => {
        dispatch(getListTools());
    }, []);

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
