import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPointer } from "../../../../slices/callCurrentVosSlice";

export default function ButtonResetPointer(props) {
    const { context } = props;
    const [disableBtn, setDisableBtn] = useState(true);
    const dispatch = useDispatch();
    const pointer = useSelector(state => state.callCurrentVos.pointer);

    const handleResetPointer = () => {
        dispatch(resetPointer());
        setDisableBtn(true);
    }

    useEffect(() => {
        if (pointer !== '') {
            setDisableBtn(false);
        }
    }, [pointer, dispatch])
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button disabled={disableBtn} onClick={handleResetPointer}>{context}</Button>
                {pointer !== '' ? (<p>{pointer.nameTime}</p>) : (<></>)}
            </div>
        </>
    )
}