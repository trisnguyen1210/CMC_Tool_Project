import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { readNameMappingGWRedux, setPickNameGW } from "../../../../slices/toolMFGatewaySlice";
import { useEffect } from "react";

export default function InputSearchFlowGateway() {

    const dispatch = useDispatch();
    const listNameGW = useSelector(state => state.toolMFGateway.listNameGW);
    const pickNameGW = useSelector(state => state.toolMFGateway.pickNameGW);

    const formatOptions = (label, value) => {
        return { label, value };
    };

    const valueOptions = listNameGW
        .filter((nameGW) => !pickNameGW.includes(nameGW)) // Lọc ra các mục chưa được chọn
        .map((e) => formatOptions(e, e));

    const handleChange = (values) => {
        dispatch(setPickNameGW(values));
    }
    useEffect(() => {
        dispatch(readNameMappingGWRedux("101.99.1.36"));
    }, [])

    return (
        <>
            <div style={{ display: "flex", alignContent: "center", alignItems: "center", gap: 5, padding: "20px 20px 0px 20px" }}>
                <p>Chọn 1 Gateway</p>
                <Select
                    mode="tags"
                    style={{ minWidth: "300px", maxWidth: "fit-content" }}
                    onChange={handleChange}
                    tokenSeparators={[","]}
                    options={valueOptions}
                    value={pickNameGW}
                />
            </div>
        </>
    );
}