import { Card, Descriptions, Input, Select, Tag, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ipData } from "../hardData";
import { readInfoNumber, setEffectList, setInputSearch, setIpSearch } from "../../../../slices/toolCPNGatewaySlice";
import { setDisableStep } from "../../../../slices/stepSlice";
import Highlighter from 'react-highlight-words';
import { useEffect } from "react";
import _ from 'lodash';
import ToolProcess from "../../ToolProcess";
import { ArrowUpDownIcon } from "lucide-react";
import StatisticTool from "./StatisticTool";

const { Text } = Typography;
const { TextArea } = Input;

export default function ToolContentDeletePNGateway() {
    const dispatch = useDispatch();
    const stepValue = useSelector((state) => state.step.stepValue);
    const inputSearch = useSelector((state) => state.toolCPNGateway.inputSearch);
    const ipSearch = useSelector((state) => state.toolCPNGateway.ipSearch);
    const resultSearch = useSelector((state) => state.toolCPNGateway.resultSearch);
    const tableSearch = useSelector((state) => state.toolCPNGateway.tableSearch);
    const handleChangeServer = (ipVos) => {
        dispatch(setIpSearch(ipVos));
    };

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


    useEffect(() => {
        if (stepValue === 1) {
            dispatch(readInfoNumber({ ipSearch, inputSearch, tableSearch }));
        }
    }, [stepValue]);

    const renderStep0 = () => (
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

    const renderStep1 = () => {
        return (
            <div>
                <StatisticTool />
                {resultSearch.map((element, index) => {
                    const prefixesArray = element.prefixes ? element.prefixes.split(',') : [];
                    const findKeyArray = element.findKey ? element.findKey.split(',') : [];
                    const commonKeys = _.intersection(prefixesArray, findKeyArray);
                    return (
                        <div className="custom_descriptions_checkPhoneNumb" key={index}>
                            <Card>
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
                                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                            searchWords={commonKeys}
                                            autoEscape
                                            textToHighlight={element.prefixes ? element.prefixes.toString() : ''}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Số tìm kiếm" labelStyle={{ width: "14%" }} contentStyle={{ width: "25%" }}>
                                        <Highlighter
                                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                            searchWords={commonKeys}
                                            autoEscape
                                            textToHighlight={element.findKey ? element.findKey.toString() : ''}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Độ dài gateway" labelStyle={{ width: "20%" }} contentStyle={{ width: "60%" }}>
                                        {`${element.prefixes.split(',').length} - ${findKeyArray.length}`}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    };

    switch (stepValue) {
        case 0:
            return renderStep0();
        case 1:
            return renderStep1();
        case 2:
            return (
                <ToolProcess />
            )
    }
}