import { Facebook } from "lucide-react";
import "./style.css";
import { login } from "../../services/axios";
import { useState } from "react";

export default function LogInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = async () => {
        const responseUser = await login(username, password);
        localStorage.setItem("token", responseUser.data);
        if (responseUser.status === "success") {
            window.location.reload();
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            handleLogIn();
        }
    };
    return (
        <div className="LogIn_background">
            <div className="LogIn_form_background" onKeyDown={handleKeyDown}>
                <h2 className="LogIn_form_title">Welcome to TriNVM Page</h2>
                <div className="LogIn_form_input">
                    <input
                        id="username"
                        className="LogIn_form_input_value"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        id="password"
                        className="LogIn_form_input_value"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="LogIn_form_btn">
                    <button id="btn" onClick={handleLogIn}>
                        Đăng nhập
                    </button>
                </div>
                <div className="horizontal_rule"></div>
                <div>
                    <h5>You get error?</h5>
                    <br />
                    <h5>Contact with TriNVM</h5>
                </div>
                <div className="LogIn_form_icon">
                    <Facebook />
                </div>
            </div>
        </div>
    );
}
