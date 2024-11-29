import { Card, Col, Row, Statistic } from "antd";
import { ShieldAlert, Trash2, UserCheck, Smile, Annoyed, Frown } from "lucide-react";
import { useSelector } from "react-redux";
import NotificationTool from './NotificationTool.jsx';
import './style.css';

export default function StatisticTool() {
    const effectList = useSelector((state) => state.toolCPNGateway.effectList) || 0;
    const notEffectList = useSelector((state) => state.toolCPNGateway.notEffectList) || 0;
    const deleteList = useSelector((state) => state.toolCPNGateway.deleteList) || 0;
    return (
        <>
            <div className="statistic_tool">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Lượng số sẽ update"
                                value={effectList.length}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<UserCheck />}
                            />
                            <NotificationTool message={"Lượng số sẽ update"} description={effectList} placement={"topLeft"} icon={<Smile color="#3f8600" />} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Lượng số không thấy"
                                value={notEffectList.length}
                                valueStyle={{
                                    color: '#fe7301',
                                }}
                                prefix={<ShieldAlert />}
                            />
                            <NotificationTool message={"Lượng số không thấy"} description={notEffectList} placement={"top"} icon={<Annoyed color="#fe7301" />} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Số lượng GW sẽ xoá"
                                value={deleteList.length}
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                                prefix={<Trash2 />}
                            />
                            <NotificationTool message={"Số lượng GW sẽ xoá"} description={deleteList} placement={"topRight"} icon={<Frown color="#cf1322" />} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}