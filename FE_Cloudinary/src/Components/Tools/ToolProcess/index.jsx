import { useParams } from "react-router-dom";
import { listComponentToolProcess } from "./hardData";

export default function ToolProcess() {
    const { slug } = useParams();
    const dataCompProcessTool = listComponentToolProcess.filter((e) => e.slug === slug)[0];
    return (
        dataCompProcessTool.component
    );
}