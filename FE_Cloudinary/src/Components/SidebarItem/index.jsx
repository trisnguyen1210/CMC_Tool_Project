import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarItem(props) {
    const { changeStatusSideBar } = props;
    const { title, icon, children, url } = props.data;
    const navigate = useNavigate();

    const [showCollapse, setShowCollapse] = useState(false);
    const changeStatusCollapse = () => setShowCollapse(!showCollapse);

    const handleNavigate = (e) => {
        changeStatusSideBar();
        navigate(e);
    };

    return (
        <>
            <>
                {children ? (
                    <>
                        <List>
                            <ListItemButton onClick={changeStatusCollapse}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                                {showCollapse ? (
                                    <>
                                        <ChevronDown />
                                    </>
                                ) : (
                                    <>
                                        <ChevronLeft />
                                    </>
                                )}
                            </ListItemButton>
                            <Collapse in={showCollapse} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {children.map((item, index) => (
                                        <ListItemButton
                                            sx={{ pl: 4 }}
                                            key={index}
                                            onClick={() => handleNavigate(item.url)}
                                        >
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                    </>
                ) : (
                    <>
                        <ListItemButton onClick={() => handleNavigate(url)}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </>
                )}
            </>
        </>
    );
}
