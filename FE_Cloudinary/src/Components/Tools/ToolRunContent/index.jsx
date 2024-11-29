import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ToolHeaderStep from "../ToolHeaderStep";
import ToolBtnChangeStep from "../ToolBtnChangeStep";
import { resetStep, setStepTotal } from "../../../slices/stepSlice";
import { setProcessTotal } from "../../../slices/processSlice";
import { listComponentToolContent } from "./hardData.jsx";
import { useParams } from "react-router-dom";
import { resetAccountVos } from "../../../slices/accountVosSlice.js";

export default function ToolRunContent() {
    const { slug } = useParams();
    const dispatch = useDispatch();

    const dataTool = listComponentToolContent.filter((e) => e.slug === slug)[0];
    useEffect(() => {
        dispatch(setStepTotal(dataTool.step));
        dispatch(setProcessTotal(dataTool.process));
        return () => { dispatch(resetStep()); dispatch(resetAccountVos()); };
    }, [dispatch]);

    return (
        <>
            <div className="background_content_tool">
                <ToolHeaderStep />
                {dataTool.component}
                <ToolBtnChangeStep />
            </div>
        </>
    );
}
