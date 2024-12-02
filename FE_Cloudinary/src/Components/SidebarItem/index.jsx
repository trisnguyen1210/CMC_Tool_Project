import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

const SidebarItem = ({ data, changeStatusSideBar }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen(!open);
        if (data.path) {
            navigate(data.path);
        }
    };

    const handleChildClick = (child) => {
        if (child.url) {
            navigate(child.url);
        }
        if (changeStatusSideBar) {
            changeStatusSideBar(child.id);
        }
    };

    return (
        <div>
            <ListItemButton
                sx={{
                    padding: "8px 16px",
                    margin: "4px 8px",
                    borderRadius: "8px",
                    "&:hover": {
                        backgroundColor: "#ADC2A9",
                        transform: "translateX(4px)",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }
                }}
                onClick={handleToggle}
            >
                <ListItemIcon>
                    {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.title} />
            </ListItemButton>

            {open &&
                data.children &&
                <List>
                    {data.children.map((child, index) =>
                        <ListItemButton
                            key={index}
                            sx={{
                                pl: 4,
                                margin: "4px 16px",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ADC2A9",
                                    transform: "translateX(4px)",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                }
                            }}
                            onClick={() => handleChildClick(child)}
                        >
                            <ListItemIcon>
                                {child.icon}
                            </ListItemIcon>
                            <ListItemText primary={child.title} />
                        </ListItemButton>
                    )}
                </List>}
        </div>
    );
};

export default SidebarItem;
