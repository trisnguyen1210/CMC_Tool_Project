import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import "../styles/Layout.css";

export default function Logged() {
    return (
        <>
            <div className="logged_background">
                <SideBar />
                <div className="content_background">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
