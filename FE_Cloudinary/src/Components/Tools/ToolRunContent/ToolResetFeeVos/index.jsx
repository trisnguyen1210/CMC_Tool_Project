import { Descriptions, Select, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getAccVos,
    resetPickAccount,
    setPickAccount,
    setPickServer,
} from "../../../../slices/accountVosSlice";
import "../../../../styles/Tool.css";
import ToolProcess from "../../ToolProcess";
import { Typography } from "antd";
import { ipData } from "../hardData.jsx";
import _ from 'lodash'
const { Text } = Typography;

export default function ToolContentResetFeeVos() {
    const dispatch = useDispatch();
    const stepValue = useSelector((state) => state.step.stepValue);
    const dataListAccount = useSelector((state) => state.accountVos.listAccount);
    const dataPickAccount = useSelector((state) => state.accountVos.pickAccount);

    const filteredAccount = dataListAccount.filter((account) =>
        dataPickAccount.includes(account.account)
    );

    const formatOptions = (label, value) => {
        return { label, value };
    };

    const valueStep0 = dataListAccount
        .filter((account) => !dataPickAccount.includes(account.account)) // Lọc ra các mục chưa được chọn
        .map((e) => formatOptions(e.account, e.name));

    const handleChange = (values) => {
        if (values.includes("@all")) {
            dispatch(setPickAccount(dataListAccount.map((account) => account.account)));
        } else if (values.length === 0) {
            dispatch(resetPickAccount());
        }
        else {
            values.map((value) => {
                if (value.startsWith('@')) {
                    const nowData = dataPickAccount;
                    const prefix = value.substring(1);
                    const filteredAccounts = dataListAccount.filter((account) => account.account.startsWith(prefix)).map((e) => { return e.account });
                    const newData = _.concat(nowData, filteredAccounts);
                    dispatch(setPickAccount(newData));
                } else {
                    dispatch(setPickAccount(values));
                }
            });
        }
    };

    const handleChangeServer = (ipVos) => {
        dispatch(setPickServer(ipVos));
        dispatch(getAccVos(ipVos));
    };

    switch (stepValue) {
        case 0:
            return (
                <div className="step_input_value">
                    <div>
                        <Text strong code style={{ fontSize: "22px" }}>
                            Chọn server kết nối
                        </Text>
                    </div>
                    <div>
                        <Select
                            defaultValue={ipData[0]}
                            onChange={handleChangeServer}
                            style={{ width: 300 }}
                            options={ipData.map((ipServer) => ({
                                label: `${ipServer.name} (${ipServer.ip})`,
                                value: ipServer.ip,
                            }))}
                        />
                    </div>
                    <div>
                        <Text strong code style={{ fontSize: "22px" }}>
                            Chọn account trên server
                        </Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Tag color="lime">Tips: Nhập "@all" để chọn tất cả</Tag>
                        <Tag color="red">Chọn server trước khi chọn account</Tag>
                    </div>
                    <div>
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            tokenSeparators={[","]}
                            options={valueStep0}
                            value={dataPickAccount}
                        />
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="custom_description_resetFeeVos">
                    {filteredAccount.map((account, index) => (
                        <Descriptions
                            bordered
                            key={index}
                            column={2}
                            size="medium"
                            className="custom_descriptions"
                        >
                            <Descriptions.Item label="Tài khoản" className="custome_item_description">
                                {account.account}
                            </Descriptions.Item>
                            <Descriptions.Item label="ID" className="custome_item_description">
                                {account.id}
                            </Descriptions.Item>
                        </Descriptions>
                    ))}
                </div>
            );
        case 2:
            return <ToolProcess />;
    }
}
