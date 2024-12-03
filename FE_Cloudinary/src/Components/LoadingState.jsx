import { Spin } from "antd";

export const LoadingState = ({ size = "large" }) => {
    return <>
        <div className="loading-state">
            <Spin size={size} />
            <p>Loading tool data...</p>
        </div>
    </>;
};