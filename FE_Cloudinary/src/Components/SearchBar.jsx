import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar({
    placeholder,
    classNameSearchBar,
    classNameInput,
    allowClear,
    value,
    onChange
}) {
    return (
        <div className={classNameSearchBar}>
            <Input
                placeholder={placeholder}
                prefix={<SearchOutlined />}
                onChange={onChange}
                value={value}
                className={classNameInput}
                allowClear={allowClear}
            />
        </div>
    );
}
