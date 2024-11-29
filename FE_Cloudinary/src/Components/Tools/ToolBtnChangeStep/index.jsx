import { useDispatch, useSelector } from "react-redux";
import { backStep, nextStep } from "../../../slices/stepSlice";
import "./style.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ToolBtnChangeStep() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const stepValue = useSelector((state) => state.step.stepValue);
    const stepTotal = useSelector((state) => state.step.stepTotal);
    const disableStatus = useSelector((state) => state.step.disableStep);

    const handleNextBtn = () => {
        if (stepValue === stepTotal) {
            navigate("/tool/list");
        } else {
            dispatch(nextStep());
        }
    };

    const handleBackBtn = () => {
        if (stepValue === 0) {
            navigate("/tool/list");
        } else {
            dispatch(backStep());
        }
    };

    return (
        <>
            <div className="tool_change_step">
                <Button onClick={handleBackBtn}> Back </Button>
                <Button onClick={handleNextBtn} disabled={disableStatus}>
                    Next
                </Button>
            </div>
        </>
    );
}
