import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { CheckBox as CB } from 'react-native-elements';
import colors from '../../resources/colors';
import { Box, Strong } from '../theme';
import styles from './styles';

export const Input = (props) => (
    <Box>
        <InputLabel style={styles.label}>{props.label}</InputLabel>
        <StyledTextInput {...props} />
    </Box>
);

export const StyledTextInput = (props) => (
    <TextInput
        style={[
            styles.input,
            props.error ? styles.error : {},
            props.valid ? styles.valid : {},
            props.style,
        ]}
        {...props}
    />
);

export const InputLabel = (props) => <Strong {...props} />;

export const InputBox = (props) => (
    <Box style={props.style}>
        <InputLabel>{props.label}</InputLabel>
        <View style={{ ...styles.input, ...props.style }}>
            {props.children}
        </View>
    </Box>
);

export const CheckBox = (props) => (
    <CB
        containerStyle={styles.choice}
        textStyle={styles.text}
        title={props.label}
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        checkedColor={colors.primary700}
        checked={props.checked}
        onPress={props.onPress}
    />
);

export const OptionBoxes = (props) => {
    const [option1Checked, setOption1Checked] = useState(false);
    const [option2Checked, setOption2Checked] = useState(false);

    useEffect(() => {
        if (props.option1Checked != option1Checked)
            setOption1Checked(props.option1Checked);
        if (props.option2Checked != option2Checked)
            setOption2Checked(props.option2Checked);
    }, [props.option1Checked, props.option2Checked]);

    useEffect(() => {
        if (!props.nullable && !props.option1Checked && !props.option2Checked)
            handlePress1();
    }, []);

    const handlePress1 = () => {
        let one = option1Checked;
        let two = option2Checked;
        if (!one) {
            one = true;
            two = false;
        } else if (props.nullable) {
            one = false;
        }
        setOption1Checked(one);
        setOption2Checked(two);
        props.onChange(one, two);
    };

    const handlePress2 = () => {
        let one = option1Checked;
        let two = option2Checked;
        if (!two) {
            one = false;
            two = true;
        } else if (props.nullable) {
            two = false;
        }
        setOption1Checked(one);
        setOption2Checked(two);
        props.onChange(one, two);
    };

    return (
        <>
            {props.label ? <InputLabel>{props.label}</InputLabel> : null}
            <Box style={styles.box}>
                <CB
                    containerStyle={styles.choice}
                    textStyle={styles.text}
                    title={props.option1}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor={colors.primary700}
                    checked={option1Checked}
                    onPress={handlePress1}
                />
                <CB
                    containerStyle={styles.choice}
                    textStyle={styles.text}
                    title={props.option2}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor={colors.primary700}
                    checked={option2Checked}
                    onPress={handlePress2}
                />
            </Box>
        </>
    );
};
