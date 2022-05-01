import React from 'react';
import { TextInput, View } from 'react-native';
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
