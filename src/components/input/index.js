import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Box } from '../theme';
import styles from './styles';

export const Input = (props) => (
    <Box>
        <Text style={styles.label}>{props.label}</Text>
        <StyledTextInput {...props} />
    </Box>
);

export const InputLabel = (props) => (
    <Text style={{ ...styles.label, ...props.style }}>{props.children}</Text>
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

export const InputBox = (props) => (
    <Box style={props.style}>
        <InputLabel>{props.label}</InputLabel>
        <View style={{ ...styles.input, ...props.style }}>
            {props.children}
        </View>
    </Box>
);
