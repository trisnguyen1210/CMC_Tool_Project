import { InputBase, Paper } from "@mui/material";
import { SearchIcon } from "lucide-react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../../slices/feeVosSlice";

export default function FeeVosSearchBar() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.feeVos.searchTerm);
    const handleSearchChange = (event) => {
        dispatch(setSearchTerm(event.target.value));
    };
    return (
        <>
            <div className="background_SearchBar">
                <Paper
                    component="form"
                    sx={{
                        p: "10px 4px 10px",
                        display: "flex",
                        alignItems: "center",
                        width: 400,
                        borderRadius: "10px",
                    }}
                >
                    <SearchIcon />
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search input"
                        inputProps={{ "aria-label": "Search input" }}
                    />
                </Paper>
            </div>
        </>
    );
}
