import React from 'react';
import { DatePicker, Space } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';


const TimeSelect = (props) => {
    const { type, updateFunction } = props;
    const dispatch = useDispatch();
    const onChange = (date, dateString) => {
        let formattedDateString = dateString;
        type.map((e) => {
            if (e === "week") {
                const startOfWeek = date.clone().startOf('week');
                const endOfWeek = date.clone().endOf('week').add(1, 'days');
                formattedDateString = `${startOfWeek.format('DD-MM-YYYY')} to ${endOfWeek.format('DD-MM-YYYY')}`;
            };
            if (e === "month") {
                const startOfMonth = date.clone().startOf('month');
                const endOfMonth = date.clone().endOf('month').add(1,'days');
                formattedDateString = `${startOfMonth.format('DD-MM-YYYY')} to ${endOfMonth.format('DD-MM-YYYY')}`;
            };
            if (e === "quarter") {
                const [yearNumb, quarterNumb] = dateString.split('-Q');
                const quarterStartMonth = (parseInt(quarterNumb - 1) * 3);
                const dateMoment = moment(`${yearNumb}-${quarterStartMonth + 1}`, 'YYYY-M');

                const startOfQuarter = dateMoment.clone().startOf('quarter');
                const endOfQuarter = dateMoment.clone().endOf('quarter').add(1, 'days');
                formattedDateString = `${startOfQuarter.format('DD-MM-YYYY')} to ${endOfQuarter.format('DD-MM-YYYY')}`;
                console.log(`Quarter: ${formattedDateString}`);
            }
            if (e === "year") {
                const startOfMonth = date.clone().startOf('year');
                const endOfMonth = date.clone().endOf('year').add(1,'days');
                formattedDateString = `${startOfMonth.format('DD-MM-YYYY')} to ${endOfMonth.format('DD-MM-YYYY')}`;
            };
            dispatch(updateFunction({ type: e, timeSearchString: formattedDateString }));
        })
    };

    return (
        <Space direction="vertical">
            {type.includes('day') ? <DatePicker onChange={onChange} /> : <></>}
            {type.includes('week') ? <DatePicker onChange={onChange} picker="week" /> : <></>}
            {type.includes('month') ? <DatePicker onChange={onChange} picker="month" /> : <></>}
            {type.includes('quarter') ? <DatePicker onChange={onChange} picker="quarter" /> : <></>}
            {type.includes('year') ? <DatePicker onChange={onChange} picker="year" /> : <></>}
        </Space>
    );
};
export default TimeSelect;