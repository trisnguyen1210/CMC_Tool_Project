import { Card } from "antd";

const ToolCard = ({ title, className, children }) => {
    return (
        <Card title={title} className={className} bordered={false}>
            {children}
        </Card>
    );
};

export default ToolCard;

