import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../button';
import styles from './styles';
import DateInput from '../dateInput';
import { useSelector } from 'react-redux';
import en from '../../resources/strings/en.json';
import { KeyboardAvoidingView } from 'native-base';
import { Box } from '../theme';
import { InputLabel, OptionBoxes } from '../input';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';

//moveInDate, moveOutDate, permanent, onSetMoveInDate, onSetMoveOutDate
export const MoveInMoveOutInput = (props) => {
    const [moveInDateValid, setMoveInDateValid] = useState(null);
    const [moveInDate, setMoveInDate] = useState(props.moveInDate);
    const [moveOutDateValid, setMoveOutDateValid] = useState(null);
    const [permanent, setPermanent] = useState(true);

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
            <OptionBoxes
                option1="Permanent"
                option2="Temporary"
                nullable={props.allowPermanentNull}
                option1Checked={props.permanent}
                option2Checked={props.permanent === false}
                onChange={(permanent, temporary) => {
                    let perm;
                    if (permanent) perm = true;
                    else if (!temporary) perm = null;
                    else perm = false;
                    setPermanent(perm);
                    if (props.onChangePermanent) props.onChangePermanent(perm);
                }}
            />
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
