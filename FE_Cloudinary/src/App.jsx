import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Logged from "./layouts/Logged";
import LogInPage from "./pages/LogInPage";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./slices/userSlice";
import ToolListPage from "./pages/ToolListPage";
import MonitorFeeVosPage from "./pages/MonitorPage/MonitorFeeVosPage";
import ToolRunPage from "./pages/ToolRunPage";
import MonitorCurrentCallVosPage from "./pages/MonitorPage/MonitorCallCurrentVosPage";
import MonitorDNCPage from "./pages/MonitorPage/MonitorDNCVosPage";
import MonitorListResetFeeVosPage from "./pages/MonitorPage/MonitorListResetFeeVosPage";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);
    const isError = useSelector((state) => state.user.isError);
    useEffect(() => {
        dispatch(getUser());
    }, []);

    if (isError === true && isLoading === false) {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<LogInPage />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
    if (isError === false && isLoading === true) {
        return <div> Loading data...</div>;
    }
    if (isError === false && isLoading == false) {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Logged />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/tool/list" element={<ToolListPage />} />
                            <Route path="/tool/run/:slug" element={<ToolRunPage />} />
                            <Route path="/tool/run/*" element={<Navigate to="/tool/list" />} />
                            <Route path="/monitor/feeVOS" element={<MonitorFeeVosPage />} />
                            <Route path="/monitor/dncVOS" element={<MonitorDNCPage />} />
                            <Route path="/monitor/listResetFeeVos" element={<MonitorListResetFeeVosPage />} />
                            <Route path="/monitor/currentCallVos" element={<MonitorCurrentCallVosPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
