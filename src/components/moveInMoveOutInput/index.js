import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../button';
import styles from './styles';
import DateInput from '../dateInput';
import { useSelector } from 'react-redux';
import en from '../../resources/strings/en.json';
import { KeyboardAvoidingView } from 'native-base';
import { Box } from '../theme';
import { InputLabel } from '../input';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';

//moveInDate, moveOutDate, permanent, onSetMoveInDate, onSetMoveOutDate
export const MoveInMoveOutInput = (props) => {
    const [moveInDateValid, setMoveInDateValid] = useState(null);
    const [moveInDate, setMoveInDate] = useState(props.moveInDate);
    const [moveOutDateValid, setMoveOutDateValid] = useState(null);
    const [permanent, setPermanent] = useState(props.permanent);

    useEffect(() => {
        if (!props.moveOutDate) {
            setPermanent(props.allowPermanentNull ? null : true);
        }
    }, [props.moveOutDate]);

    useEffect(() => {
        setPermanent(props.permanent);
    }, [props.permanent]);

    useEffect(() => {
        setMoveInDate(props.moveInDate);
    }, [props.moveInDate]);
    return (
        <>
            <DateInput
                label={
                    props.moveInLabel
                        ? props.moveInLabel
                        : en.roomInfo.moveInDate
                }
                //error={moveInDateValid === false}
                defaultDate={moveInDate ? new Date(moveInDate) : null}
                onChange={(date, valid) => {
                    if (valid) {
                        setMoveInDate(date);
                        props.onSetMoveInDate(date);
                    }
                    setMoveInDateValid(valid && date > new Date());
                }}
            />
            <InputLabel>{en.roomInfo.duration}</InputLabel>
            <Box style={styles.box}>
                <CheckBox
                    containerStyle={styles.choice}
                    wrapperStyle={styles.wrapper}
                    textStyle={styles.text}
                    title="Permanent"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    color="#0E7490"
                    checked={permanent === true}
                    onPress={() => {
                        let isPermanent;
                        if (permanent !== true || !props.allowPermanentNull)
                            isPermanent = true;
                        else isPermanent = null;
                        props.onSetMoveOutDate(null);
                        props.onSetPermanent(isPermanent);
                        setPermanent(isPermanent);
                    }}
                />
                <CheckBox
                    containerStyle={styles.choice}
                    wrapperStyle={styles.wrapper}
                    textStyle={styles.text}
                    title={'Temporary'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    color="#0E7490"
                    checked={permanent === false}
                    onPress={() => {
                        let isPermanent;
                        if (permanent !== false || !props.allowPermanentNull)
                            isPermanent = false;
                        else isPermanent = null;
                        setPermanent(isPermanent);
                        props.onSetPermanent(isPermanent);
                    }}
                />
            </Box>
            {permanent === false ? (
                <DateInput
                    label={
                        props.moveOutLabel
                            ? props.moveOutLabel
                            : en.roomInfo.moveOutDate
                    }
                    error={moveOutDateValid === false}
                    defaultDate={
                        props.moveOutDate ? new Date(props.moveOutDate) : null
                    }
                    onChange={(date, valid) => {
                        const isValid = valid && date > new Date(moveInDate);
                        if (isValid) props.onSetMoveOutDate(date);
                        setMoveOutDateValid(isValid);
                    }}
                />
            ) : null}
        </>
    );
};
