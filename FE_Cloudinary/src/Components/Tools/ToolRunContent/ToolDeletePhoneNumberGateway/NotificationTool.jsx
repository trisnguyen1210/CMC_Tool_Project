import '../../../../styles/Tool.css';
import { notification } from 'antd';
import { CircleAlert } from 'lucide-react';

const NotificationTool = ({ message, description, placement, icon }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: message,
            description: description.toString(),
            icon: icon,
            placement: placement
        });
    };
    return (
        <>
            {contextHolder}
            <CircleAlert className="info_icon_style" onClick={openNotification} />
        </>
    );
};
export default NotificationTool;