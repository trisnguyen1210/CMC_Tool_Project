import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar({
    placeholder,
    className,
    allowClear,
    value,
    onChange
}) {
    return (
        <div>
            <Input
                placeholder={placeholder}
                prefix={<SearchOutlined />}
                onChange={onChange}
                value={value}
                className={className}
                allowClear={allowClear}
            />
        </div>
    );
}
