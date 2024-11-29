import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ToolListTable from "../../Components/Tools/ToolListTable";

export default function ToolListPage() {
    const getRole = useSelector((state) => state.user.infoUser.role);
    const column = [];
    return (
        <>
            {/* {getRole <= 1 && (<Button>Add tool</Button>)} */}
            <ToolListTable />
        </>
    );
}
