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
import SidebarItem from "../Components/SidebarItem";
import '../styles/Sidebar.css'
// import SidebarItem from '../Components/SidebarItem';

export default function SideBar() {
    const [showSideBar, setShowSideBar] = useState(false);

    const changeStatusSideBar = () => setShowSideBar(!showSideBar);

    const sidebarList = [
        {
            title: "Trang chủ",
            icon: <Home />,
            url: "/",
            isMainMenu: true
        },
        {
            title: "Công cụ",
            icon: <ListChecks />,
            url: "/tool",
            isMainMenu: true,
            children: [
                {
                    title: "Danh sách công cụ",
                    icon: <BookText />,
                    url: "/tool/list",
                    description: "Xem tất cả công cụ hệ thống"
                },
                {
                    title: "Tìm kiếm",
                    icon: <SearchCode />,
                    url: "/tool/search",
                    description: "Tìm kiếm công cụ"
                },
            ],
        },
        {
            title: "Giám sát",
            icon: <Monitor />,
            url: "/monitor",
            isMainMenu: true,
            children: [
                {
                    title: "Cước VOS",
                    icon: <Percent />,
                    url: "/monitor/feeVOS",
                    group: "VOS",
                    description: "Theo dõi cước phí VOS"
                },
                {
                    title: "Call Current VOS",
                    icon: <Drama />,
                    url: "/monitor/currentCallVos",
                    group: "VOS",
                    description: "Theo dõi cuộc gọi hiện tại"
                },
                {
                    title: "DS reset cước",
                    icon: <HandCoins />,
                    url: "/monitor/listResetFeeVos",
                    group: "VOS",
                    description: "Danh sách reset cước"
                },
            ],
        },
    ];

    return (
        <>
            <div 
                className="side_bar_btn"
                style={{
                    position: 'fixed',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 9999,
                    backgroundColor: '#D3E4CD',
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                    left: showSideBar ? '280px' : '0',
                    transition: 'left 0.3s ease'
                }}
            >
                <Button 
                    onClick={changeStatusSideBar}
                    sx={{
                        minWidth: '40px',
                        padding: '8px',
                        '&:hover': {
                            backgroundColor: '#ADC2A9'
                        }
                    }}
                >
                    <ChevronsRight 
                        size={32} 
                        style={{
                            transform: showSideBar ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                            color: '#000000'
                        }}
                    />
                </Button>
            </div>
            <Drawer 
                open={showSideBar} 
                onClose={changeStatusSideBar}
                sx={{
                    '& .MuiDrawer-paper': {
                        borderRight: 'none',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <Box
                    sx={{
                        width: 280,
                        backgroundColor: '#D3E4CD',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '16px 0'
                    }}
                    role="presentation"
                >
                    <div>
                        {sidebarList.map((e, index) => (
                            <SidebarItem
                                data={e}
                                key={index}
                                changeStatusSideBar={changeStatusSideBar}
                            />
                        ))}
                    </div>
                    <div style={{
                        padding: '16px',
                        borderTop: '1px solid rgba(0,0,0,0.12)'
                    }}>
                        <Button 
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#99A799',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#7A8B7A'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Box>
            </Drawer>
        </>
    );
}
