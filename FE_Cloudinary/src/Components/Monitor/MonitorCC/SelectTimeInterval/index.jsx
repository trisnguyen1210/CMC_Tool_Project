import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeInterval } from '../../../../slices/callCurrentVosSlice';

const SelectTimeInterval = () => {
    const dispatch = useDispatch();
    const defaultListTimes = [30000, 10000, 5000];
    const timeSelected = useSelector((state) => state.callCurrentVos.timeInterval);
    const listTimesStorage = JSON.parse(localStorage.getItem('listTimes'));
    const [listTimes, setListTimes] = useState(defaultListTimes);
    const [addTime, setAddTime] = useState('');
    const inputRef = useRef(null);

    const onNewTimeChange = (event) => {
        const isNumber = isNaN(event.target.value);
        if (!isNumber) { setAddTime(Number(event.target.value)); }
        else { console.log("data is not a Number"); };
    };

    const onChangeTimeInterval = (e) => {
        dispatch(updateTimeInterval(e));
    }

    const addItem = (e) => {
        e.preventDefault();
        if (addTime !== '') {
            setListTimes([...listTimes, addTime]);
            localStorage.setItem('listTimes', JSON.stringify([...listTimes, addTime]));
            setAddTime('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    useEffect(() => {
        if (listTimesStorage === null) {
            localStorage.setItem('listTimes', JSON.stringify(defaultListTimes));
            setListTimes(defaultListTimes);
        } else {
            setListTimes(listTimesStorage);
        }
    }, [])
    return (
        <>
            <div style={{ display: "flex", alignContent: "center", alignItems: "center", gap: 5, padding: "20px 20px 20px 20px" }}>
                <p>Set interval time</p>
                <Select
                    style={{ width: 150 }}
                    placeholder="Choose Interval"
                    defaultValue={timeSelected}
                    onChange={onChangeTimeInterval}
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                                <Input
                                    placeholder="Please enter new time (milisecond)"
                                    ref={inputRef}
                                    value={addTime}
                                    onChange={onNewTimeChange}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                </Button>
                            </Space>
                        </>
                    )}
                    options={listTimes.map((item) => ({ label: item, value: item }))}
                />
            </div>
        </>
    );
};
export default SelectTimeInterval;