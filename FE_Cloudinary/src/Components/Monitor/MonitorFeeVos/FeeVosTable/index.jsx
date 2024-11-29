import React, { useEffect, useState } from "react";
import { Table, Switch, Progress, Spin } from "antd";
import { Typography } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getFeeVos } from "../../../../slices/feeVosSlice";
import { green, red, yellow } from "@mui/material/colors";

export default function FeeVosTable() {
    const dispatch = useDispatch();
    const saveColumns = localStorage.getItem("visibleColumns");
    const initialVisibleColumns = saveColumns
        ? JSON.parse(saveColumns)
        : {
              id: false,
              account: true,
              name: true,
              starttime: true,
              lastupdatetime: true,
              money: true,
              validtime: true,
              limitmoney: true,
              percent: true,
          };

    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
        { title: "Account", dataIndex: "account", key: "account" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Starttime", dataIndex: "starttime", key: "starttime" },
        { title: "Cập nhật", dataIndex: "lastupdatetime", key: "lastupdatetime" },
        {
            title: "Cước phí",
            dataIndex: "money",
            key: "money",
            sorter: (a, b) => a.money - b.money,
            render: (money) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                }).format(money);
            },
        },
        {
            title: "Hạn mức",
            dataIndex: "limitmoney",
            key: "limitmoney",
            sorter: (a, b) => a.limitmoney - b.limitmoney,
            render: (limitmoney) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                }).format(limitmoney);
            },
        },
        { title: "Thời hạn", dataIndex: "validtime", key: "validtime" },
        {
            title: "percent",
            dataIndex: "percent",
            key: "percent",
            sorter: (a, b) => a.percent - b.percent,
            render: (percent) => (
                <>
                    <Progress
                        steps={4}
                        percent={Math.round(percent)}
                        strokeColor={[green["400"], green["400"], yellow["700"], red["600"]]}
                        status={percent >= 100 ? "exception" : ""}
                    />
                </>
            ),
        },
    ];

    const filteredColumns = columns.filter((column) => visibleColumns[column.key]);
    const toggleColumn = (key) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const serverFeeVos = useSelector((state) => state.feeVos.serverFeeVos);
    const infoFeeVos = useSelector((state) => state.feeVos.infoFeeVos);
    const searchTerm = useSelector((state) => state.feeVos.searchTerm);
    const isLoading = useSelector((state) => state.feeVos.isLoading);
    const isError = useSelector((state) => state.feeVos.isError);

    // Hàm để filter dữ liệu
    const isFilteredData =
        searchTerm.length > 0
            ? infoFeeVos.filter((item) =>
                  Object.values(item).some((value) => {
                      return value.toString().toLowerCase().includes(searchTerm.toLowerCase()); // Thêm 'return' ở đây
                  })
              )
            : infoFeeVos;

    const getRowClassName = (record) => {
        let className = "";
        if (record.locktype === 1 || record.percent >= 98) {
            className += "row-red";
        }
        return className;
    };
1
    useEffect(() => {
        dispatch(getFeeVos(serverFeeVos));
        const intervalId = setInterval(() => {
            dispatch(getFeeVos(serverFeeVos));
        }, 60000);
        localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
        return () => clearInterval(intervalId);
    }, [visibleColumns, serverFeeVos]);

    return (
        <>
            <div className="options_table">
                {columns.map((column, index) => (
                    <div key={index} className="choose_options_table">
                        <Typography sx={{ fontSize: "16px" }}>{column.title}:</Typography>
                        <Switch
                            checked={visibleColumns[column.key]}
                            onChange={() => toggleColumn(column.key)}
                            key={column.key}
                        ></Switch>
                    </div>
                ))}
            </div>
            {isLoading ? (
                <div
                    style={{
                        margin: "20px 0px",
                        marginBottom: "20px",
                        padding: "30px 50px",
                        textAlign: "center",
                        background: "rgba(0,0,0,0.05)",
                        borderRadius:"4px"
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Table
                    dataSource={isFilteredData}
                    columns={filteredColumns}
                    rowKey="id"
                    rowClassName={getRowClassName}
                    pagination={false}
                    scroll={{ y: 410 }}
                />
            )}
        </>
    );
}
