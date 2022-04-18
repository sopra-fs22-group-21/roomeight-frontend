import dateFormat from 'dateformat';
import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { InputLabel } from '../input';
import { Box } from '../theme';
import styles from './style';

const DateInput = (props) => {
    const [day, setDay] = useState(
        props.date ? dateFormat(props.date, 'dd') : ''
    );
    const [month, setMonth] = useState(
        props.date ? dateFormat(props.date, 'mm') : ''
    );
    const [year, setYear] = useState(
        props.date ? dateFormat(props.date, 'yyyy') : ''
    );
    const isDay = (value) => {
        return !isNaN(value) && value.length <= 2 && Number(value) <= 31;
    };
    const isMonth = (value) => {
        return !isNaN(value) && value.length <= 2 && Number(value) < 13;
    };
    const isYear = (value) => {
        return !isNaN(value) && value.length <= 4;
    };
    const monthInput = useRef(null);
    const yearInput = useRef(null);

    const changeDate = (d, m, y) => {
        // create date and validate
        const notEmpty = y && y != '' && m && m != '' && d && d != '';
        const dt = new Date(Date.parse(y + '-' + m + '-' + d));
        const correctNumbers =
            isYear(y) &&
            isMonth(m) &&
            isDay(d) &&
            !isNaN(dt) &&
            Number(y) > 1900;
        const validFebruary =
            (d < 30 || m != 2) && (d < 29 || m != 2 || y % 4 == 0);
        const valid = notEmpty && correctNumbers && validFebruary;
        if (valid) {
            props.onChange(dt, true);
        } else {
            if (
                (d && d != '' && !isDay(d)) ||
                (!isMonth(m) && m && m != '' && !isYear(y) && y && y != '')
            )
                props.onChange(null, false);
            else props.onChange(null, null);
        }
        setYear(y);
        setDay(d);
        setMonth(m);
    };

    return (
        <Box>
            <InputLabel>{props.label}</InputLabel>
            <View style={styles.row}>
                <TextInput
                    style={[
                        styles.input,
                        styles.day,
                        props.error ? styles.error : {},
                        props.valid ? styles.valid : {},
                    ]}
                    {...props}
                    placeholder="dd"
                    keyboardType="number-pad"
                    value={day}
                    onChangeText={(text) => {
                        if (isDay(text)) {
                            changeDate(text, month, year);
                            if (text.length == 2) monthInput.current.focus();
                        }
                    }}
                    onEndEditing={(event) => {
                        let num = event.nativeEvent.text;
                        if (
                            Number(num) < 10 &&
                            Number(num) > 0 &&
                            num != '' &&
                            num.length < 2
                        )
                            num = '0' + num;
                        changeDate(num, month, year);
                    }}
                    returnKeyType="next"
                    blurOnSubmit={false}
                />
                <TextInput
                    ref={monthInput}
                    style={[
                        styles.input,
                        styles.month,
                        props.error ? styles.error : {},
                        props.valid ? styles.valid : {},
                        props.style,
                    ]}
                    {...props}
                    keyboardType="number-pad"
                    placeholder="mm"
                    value={month}
                    onChangeText={(text) => {
                        if (isMonth(text)) {
                            changeDate(day, text, year);
                            if (text.length == 2) yearInput.current.focus();
                        }
                    }}
                    onEndEditing={(event) => {
                        let num = event.nativeEvent.text;
                        if (
                            Number(num) < 10 &&
                            Number(num) > 0 &&
                            num != '' &&
                            num.length < 2
                        )
                            num = '0' + num;
                        changeDate(day, num, year);
                    }}
                    returnKeyType="next"
                    blurOnSubmit={false}
                />
                <TextInput
                    ref={yearInput}
                    {...props}
                    style={[
                        styles.input,
                        styles.year,
                        props.error ? styles.error : {},
                        props.valid ? styles.valid : {},
                        props.style,
                    ]}
                    placeholder="yyyy"
                    keyboardType="number-pad"
                    value={year}
                    onChangeText={(text) => {
                        if (isYear(text)) {
                            changeDate(day, month, text);
                        }
                    }}
                />
            </View>
        </Box>
    );
};

export default DateInput;
