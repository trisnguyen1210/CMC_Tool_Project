import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { listComponentToolContent } from "../../Components/Tools/ToolRunContent/hardData";
import ToolRunContent from "../../Components/Tools/ToolRunContent";
import { useEffect } from "react";
export default function ToolRunPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const listTool = useSelector((state) => state.tool.listTool);
    const isLoading = useSelector((state) => state.tool.isLoading);
    const isError = useSelector((state) => state.tool.isError);

    const tool = listTool.filter((e) => e.slug === slug)[0];
    const ToolContent = listComponentToolContent.filter((e) => e.slug === slug)[0];

    if (listTool.length === 0) {
        useEffect(() => {
            navigate("/tool/list");
        }, []);
        return <></>;
    }
    
    if (isLoading === false && isError === false) {
        return (
            <>
                <div style={{ textAlign: "center", width: "100%" }}>
                    <h2>Thông tin công cụ: {`${ToolContent.slug}`}</h2>
                    <h3>Chức năng: {`${tool.description}`}</h3>
                    <ToolRunContent />
                </div>
            </>
        );
    }
}
