import { useDispatch, useSelector } from "react-redux";
import { Card, Descriptions, Flex, Input, Radio, Select, Tag } from "antd";
import { Typography } from "antd";
import {
    readInfoNumber,
    setInputSearch,
    setIpSearch,
    setTableSearch,
} from "../../../../slices/toolCPNGatewaySlice";
import { useEffect } from "react";
import { ipData } from "../hardData";
import { setDisableStep } from "../../../../slices/stepSlice";
import _ from 'lodash';
import './style.css';
import Highlighter from "react-highlight-words";

const { Text } = Typography;
const { TextArea } = Input;

export default function ToolContentCheckPNGateway() {
    const dispatch = useDispatch();
    const stepValue = useSelector((state) => state.step.stepValue);
    const inputSearch = useSelector((state) => state.toolCPNGateway.inputSearch);
    const ipSearch = useSelector((state) => state.toolCPNGateway.ipSearch);
    const resultSearch = useSelector((state) => state.toolCPNGateway.resultSearch);
    const tableSearch = useSelector((state) => state.toolCPNGateway.tableSearch);
    const handleChangeSearchInput = (e) => {
        const value = e.target.value;
        const regex = new RegExp(/^[0-9,]*$/);
        dispatch(setInputSearch(value));
        if (regex.test(value)) {
            dispatch(setDisableStep(false));
        } else {
            dispatch(setDisableStep(true));
        }
    };

    const handleChangeTableInput = ({ target: { value } }) => {
        dispatch(setTableSearch(value));
    }

    const handleChangeServer = (ipVos) => {
        dispatch(setIpSearch(ipVos));
    };

    useEffect(() => {
        if (stepValue === 1) {
            dispatch(readInfoNumber({ ipSearch, inputSearch, tableSearch }));
        }
    }, [stepValue, tableSearch]);

    switch (stepValue) {
        case 0:
            return (
                <div className="step_input_value">
                    <div>
                        <Text strong code style={{ fontSize: "22px" }}>
                            Chọn bảng gateway tìm kiếm
                        </Text>
                    </div>
                    <Flex vertical gap="middle">
                        <Radio.Group defaultValue={tableSearch} size="large" buttonStyle="solid" onChange={handleChangeTableInput}>
                            <Radio.Button value="Mapping">Mapping Gateway</Radio.Button>
                            <Radio.Button value="Routing">Routing Gateway</Radio.Button>
                        </Radio.Group>
                    </Flex>
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
                            Nhập các số cần tìm
                        </Text>
                    </div>
                    <div>
                        <Tag color="magenta">Các số cách nhau bởi dấu phẩy ( , )</Tag>
                        <Tag color="red">Nhập số lượng nhỏ để dễ kiểm tra</Tag>
                        <Tag color="purple">Có thể kéo dài ô nhập số để dễ check lỗi</Tag>
                    </div>
                    <TextArea rows={4} onChange={handleChangeSearchInput} />
                </div>
            );
        case 1:
            return (
                <div>
                    {resultSearch.map((element, index) => {
                         const prefixesArray = element.prefixes ? element.prefixes.split(',') : [];
                        const findKeyArray = element.findKey ? element.findKey.split(',') : [];
                        const commonKeys = _.intersection(prefixesArray, findKeyArray);
                        const uniquePrefixes = _.difference(prefixesArray, findKeyArray).join(',');
                        return (
                            <div className="custom_descriptions_checkPhoneNumb" key={index}>
                                <Card key={index}>
                                    <Descriptions
                                        bordered
                                        key={index}
                                        column={2}
                                        size="medium"
                                        labelStyle={{ backgroundColor: "#DFD0B8", fontFamily: "Freeman" }}
                                    >
                                        <Descriptions.Item label="Tên" labelStyle={{ width: "14%" }} contentStyle={{ width: "25%" }}>
                                            {element.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Thông tin gateway" labelStyle={{ width: "20%" }} contentStyle={{ width: "60%" }}>
                                            <Highlighter
                                                highlightStyle={{
                                                    backgroundColor: '#A5DD9B',
                                                    padding: 0,
                                                }}
                                                searchWords={commonKeys}
                                                autoEscape
                                                textToHighlight={element.prefixes ? element.prefixes.toString() : ''}
                                            />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Số tìm kiếm" labelStyle={{ width: "14%" }} contentStyle={{ width: "25%" }}>
                                            {element.findKey}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Độ dài gateway" labelStyle={{ width: "20%" }} contentStyle={{ width: "60%" }} >
                                            {element.length}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="List tách số tìm kiếm" labelStyle={{ width: "20%" }} contentStyle={{ width: "60%" }} >
                                            {uniquePrefixes}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </div>
                        )
                    })
                    }
                </div >
            );
        default:
            break;
    }
}
