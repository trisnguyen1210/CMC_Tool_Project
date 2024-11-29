import { Paper } from "@mui/material";
import './style.css';

export default function LRFVosTitle() {
    return (
        <>
            <Paper elevation={24} sx={{ borderRadius: "16px" }}>
                <div id="LRFVos_title">Danh sách tài khoản cước tự reset</div>
            </Paper>
        </>
     )
}