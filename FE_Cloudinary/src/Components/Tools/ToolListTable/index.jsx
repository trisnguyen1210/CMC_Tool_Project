import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTools } from "../../../slices/toolSlice";
import { useNavigate } from "react-router-dom";
import './style.css';

function createData(codeNumb, name, slug, level, victims) {
    return { codeNumb, name, slug, level, victims };
}

export default function ToolListTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listTool = useSelector((state) => state.tool.listTool);

    const rows = listTool.map((item) =>
        createData(item._id, item.nameTool, item.slug, item.influenceLevel, item.componentEffect)
    );

    const columns = [
        { id: "codeNumb", label: "Mã Tool", minWidth: 70, maxWidth: 80 },
        { id: "name", label: "Tên tool", minWidth: 70, maxWidth: 80 },
        { id: "level", label: "Mức độ ảnh hưởng", minWidth: 10, maxWidth: 30 },
        { id: "victims", label: "T.Phần ảnh hưởng", minWidth: 10, maxWidth: 30 },
        { id: "action", label: "Hành động", minWidth: 10, maxWidth: 30 },
    ];

    const handleRunTool = (toolPath) => {
        navigate(toolPath);
    };
    useEffect(() => {
        dispatch(getListTools());
    }, []);
    return (
        <>
            <Paper sx={{ width: "90%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            maxWidth: column.maxWidth,
                                            textAlign: "center",
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "action") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            maxWidth: column.maxWidth,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={() => {
                                                                handleRunTool(
                                                                    `/tool/run/${row.slug}`
                                                                );
                                                            }}
                                                        >
                                                            Run
                                                        </Button>
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            maxWidth: column.maxWidth,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}
