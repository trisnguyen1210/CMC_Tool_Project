import { Badge, Box, Paper, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setServerFeeVos } from "../../../../slices/feeVosSlice";

function numberIcon(number, color) {
    return (
        <>
            <Badge color={color} variant="dot">
                <Box sx={{ paddingRight: "10px", fontSize: "25px" }}>{number}</Box>
            </Badge>
        </>
    );
}

export default function FeeVosGeneralMonitor() {
    const value = useSelector((state) => state.feeVos.serverFeeVos);
    const dispatch = useDispatch();
    const handleChangeValue = (event, newValue) => {
        dispatch(setServerFeeVos(newValue));
    };
    
    return (
        <>
            <Paper elevation={24} sx={{ borderRadius: "16px", overflow: "hidden" }}>
                <Tabs
                    value={value}
                    onChange={handleChangeValue}
                    aria-label="icon position tabs example"
                    sx={{ padding: "5px 30px" }}
                >
                    <Tab
                        value="101.99.5.68"
                        icon={numberIcon(1, "info")}
                        label="VOS QUỐC TẾ"
                        sx={{ fontSize: "1rem", fontFamily: "inherit" }}
                    />
                    <Tab
                        value="101.99.5.65"
                        icon={numberIcon(2, "success")}
                        label="VOS VBrandName"
                        sx={{ fontSize: "1rem", fontFamily: "inherit" }}
                    />
                    <Tab
                        value="101.99.1.36"
                        icon={numberIcon(3, "warning")}
                        label="VOS CTel"
                        sx={{ fontSize: "1rem", fontFamily: "inherit" }}
                    />
                </Tabs>
            </Paper>
        </>
    );
}
