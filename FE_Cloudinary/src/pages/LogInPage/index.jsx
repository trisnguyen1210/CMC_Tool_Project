import "../../styles/Login.css";
import { Button, Card, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo_trinvm from "../../assets/logo_trinvm.png";
import { loginUser } from "../../redux/thunks/user.thunk";

export default function LogInPage() {
    const dispatch = useDispatch();
    const handleLogIn = async (credentials) => {
		try {
			await dispatch(loginUser(credentials)).unwrap();
			message.success('Đăng nhập thành công!');
		} catch (error) {
			message.error(error?.message || 'Đăng nhập thất bại')
		}
    };

    return (
        <div className="LogIn_background">
            <div className="login-container">
                <Card className="login-card" title="Đăng nhập" bordered={false}>
                    <div className="logo-container">
                        <img
                            src={logo_trinvm}
                            alt="TriNVM Logo"
                            className="login-logo"
                        />
                    </div>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        layout="vertical"
                        size="large"
						autoComplete="off"
                        onFinish={handleLogIn}
                        onFinishFailed={(errorInfo) => {
                            message.error('Vui lòng kiểm tra lại thông tin đăng nhập!');
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập username "
                                }
                            ]}
                        >
                            <Input
                                placeholder="Username"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập password"
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="login-button"
                                type="primary"
                                htmlType="submit"
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
