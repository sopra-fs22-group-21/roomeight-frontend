import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './style';

export const Input = (props) => (
    <View>
        <TextInput style={styles.input} {...props.children} />
    </View>
);
