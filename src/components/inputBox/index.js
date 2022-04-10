import React from 'react';
import { Box } from '../theme';
import styles from './style';
import { Text, View } from 'react-native';

export const InputBox = (props) => (
    <Box>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styleInputBox}>{props.children}</View>
    </Box>
);

export const InputBoxLabel = (props) => (
    <Text style={styles.label}>{props.label}</Text>
);
