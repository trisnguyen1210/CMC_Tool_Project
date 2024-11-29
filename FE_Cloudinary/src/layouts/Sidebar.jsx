import {
    BookText,
    ChevronsRight,
    Drama,
    HandCoins,
    Home,
    ListChecks,
    Monitor,
    Percent,
    SearchCode,
} from "lucide-react";
import { useState } from "react";
import { Box, Button, Divider, Drawer } from "@mui/material";
import "./style.css";
import SidebarItem from "../Components/SidebarItem";
// import SidebarItem from '../Components/SidebarItem';

export default function SideBar() {
    const [showSideBar, setShowSideBar] = useState(false);
    const [showCollapse, setShowCollapse] = useState(false);

    const changeStatusSideBar = () => setShowSideBar(!showSideBar);

    const sidebarList = [
        { title: "Trang chủ", icon: <Home />, url: "/" },
        {
            title: "Công cụ",
            icon: <ListChecks />,
            url: "/tool",
            children: [
                {
                    title: "Danh sách",
                    icon: <BookText />,
                    url: "/tool/list",
                },
                // {
                //     title: "Tìm kiếm",
                //     icon: <SearchCode />,
                //     url: "/feature/language",
                // },
            ],
        },
        {
            title: "Giám sát",
            icon: <Monitor />,
            url: "/monitor",
            children: [
                {
                    title: "Cước VOS",
                    icon: <Percent />,
                    url: "/monitor/feeVOS",
                },
                {
                    title: "Call Current VOS",
                    icon: <Drama />,
                    url: "/monitor/currentCallVos",
                },
                // {
                //     title: "DS reset cước",
                //     icon: <HandCoins />,
                //     url: "/monitor/listResetFeeVos"
                // },
                // {
                //     title: "DNC",
                //     icon: <Drama />,
                //     url: "/monitor/dncVOS"
                // },
            ],
        },
    ];

    return (
        <>
            <div className="side_bar_btn">
                <Button onClick={changeStatusSideBar}>
                    <ChevronsRight size={48} />
                </Button>
            </div>
            <Drawer open={showSideBar} onClose={changeStatusSideBar}>
                <Box
                    sx={{
                        width: 250,
                        backgroundColor: "#D3E4CD",
                        height: "100%",
                    }}
                    role="presentation"
                >
                    {sidebarList.map((e, index) => (
                        <SidebarItem
                            data={e}
                            key={index}
                            changeStatusSideBar={changeStatusSideBar}
                        />
                    ))}
                    <Divider />
                    <div>
                        <Button>Logout</Button>
                    </div>
                </Box>
            </Drawer>
        </>
    );
}
