import { Steps } from "antd";
import { useSelector } from "react-redux";
import "../../../styles/Tool.css";
import { useParams } from "react-router-dom";
import { listStepTool } from "../ToolRunContent/hardData";

export default function ToolHeaderStep() {
    const { slug } = useParams();
    const listStep = listStepTool.filter((e) => e.slug === slug)[0];
    const stepValue = useSelector((state) => state.step.stepValue);
    return (
        <>
            <div className="tool_header_step">
                <Steps size="medium" current={stepValue} items={listStep.listStep} />
            </div>
        </>
    );
}
