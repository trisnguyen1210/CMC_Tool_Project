import { useDispatch, useSelector } from "react-redux"
import { setIpVos } from "../../../../slices/dncVosSlice";
import { Paper, Tab, Tabs } from "@mui/material";

export default function DNCVosGeneral() {
    const dispatch = useDispatch();
    const ipVos = useSelector(state => state.dataDNC.ipVos)

    const handleChangeValue = (event, newValue) => {
        dispatch(setIpVos(newValue));
    };

    return (
        <>
            <Paper elevation={24} sx={{ borderRadius: "16px", overflow: "hidden" }}>
                <Tabs
                    value={ipVos}
                    onChange={handleChangeValue}
                    aria-label="icon position tabs example"
                    sx={{ padding: "5px 30px" }}
                >
                    <Tab
                        value="101.99.1.36"
                        label="VOS CTEL"
                        sx={{ fontSize: "1rem", fontFamily: "inherit" }}
                    />
                </Tabs>
            </Paper>
        </>
    )
}