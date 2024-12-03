import { Alert } from "antd";

export const ErrorState = ({ message = "Error", className = "error-state", description = "Error", type = "error", showIcon = "true" }) => {
    return (
        <>
            <div className={className}>
                <Alert
                    message={message}
                    description={description}
                    type={type}
                    showIcon={showIcon}
                />
            </div>
        </>
    );
};