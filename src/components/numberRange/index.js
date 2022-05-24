import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import RangeSlider from 'rn-range-slider';
import { InputLabel } from '../input';
import { Box, NormalText } from '../theme';
import styles from './styles';

export const NumberRange = (props) => {
    const [low, setLow] = useState(props.low ? props.low : props.min);
    const [lowLabel, setLowLabel] = useState(props.low ? props.low : ' ');
    const [high, setHigh] = useState(props.high ? props.high : props.max);
    const [highLabel, setHighLabel] = useState(props.high ? props.high : ' ');
    const renderThumb = useCallback(() => <View style={styles.thumb} />, []);
    const renderRail = useCallback(() => <View style={styles.rail} />, []);
    const renderRailSelected = useCallback(
        () => <View style={styles.selected} />,
        []
    );

    useEffect(() => {
        if (props.low == null) setLow(props.min);
    }, [props.low]);

    useEffect(() => {
        if (props.high == null) setHigh(props.max);
    }, [props.high]);

    //const renderNotch = useCallback(() => <View style={styles.notch}/>, []);
    const handleValueChange = (newLow, newHigh) => {
        setLow(newLow);
        setHigh(newHigh);
        if (newLow == props.min) newLow = undefined;
        if (newHigh == props.max) newHigh = undefined;
        setLowLabel(newLow ? newLow : ' – ');
        setHighLabel(newHigh ? newHigh : ' – ');
        let range = '';
        if (!newLow && newHigh) range += 'at most ' + newHigh;
        else if (newLow && !newHigh) range += 'at least ' + newLow;
        else if (newLow && newHigh && newLow == newHigh)
            range += 'exactly ' + newHigh;
        else if (newLow && newHigh) range += newLow + ' – ' + newHigh;
        props.onRangeChange(range);
        if (newLow != props.low || newHigh != props.high)
            props.onValueChange(newLow, newHigh);
    };
    return (
        <>
            <InputLabel>{props.label}</InputLabel>
            <View style={styles.row}>
                <NormalText style={styles.text}>{lowLabel}</NormalText>
                <View style={{ flex: 1 }}>
                    <RangeSlider
                        style={styles.slider}
                        min={props.min}
                        max={props.max}
                        low={low}
                        high={high}
                        step={props.step ? props.step : 1}
                        minRange={props.minRange}
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        onValueChanged={(low, high) =>
                            handleValueChange(low, high)
                        }
                    />
                </View>
                <NormalText style={styles.text}>{highLabel}</NormalText>
            </View>
            <Box />
        </>
    );
};
