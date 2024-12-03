import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingState } from "../../Components/LoadingState";
import { ErrorState } from "../../Components/ErrorState";
import ToolRunContent from "../../Components/Tools/ToolRunContent";
import { useSelector } from "react-redux";
import { listComponentToolContent } from "../../Components/Tools/ToolRunContent/hardData";

const ToolRunPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { listTool, isLoading, isError } = useSelector((state) => state.tool);
    const tool = listTool.find((e) => e.slug === slug);
    const toolContent = listComponentToolContent.find((e) => e.slug === slug);

    useEffect(() => {
        if (listTool.length === 0) {
            navigate("/tool/list");
        }
    }, [listTool.length, navigate]);

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return <ErrorState />;
    }

    if (!tool || !toolContent) {
        return <ErrorState message="Tool not found" />;
    }

    return (
        <div className="tool-run-page">
            <div className="tool-run-page-title">Thông tin công cụ: {toolContent.slug}</div>
            <div className="tool-run-page-description">Chức năng: {tool.description}</div>
            <ToolRunContent />
        </div>
    );
};

export default ToolRunPage;