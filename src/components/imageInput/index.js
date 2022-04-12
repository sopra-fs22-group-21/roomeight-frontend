import React from 'react';
import { Pressable, Text, View, Button } from 'react-native';
import styles from './style';
import { Container } from '../theme';

const ImageInput = (props) => (
    <Pressable {...props} style={() => [styles.background]}>
        <View style={styles.icon}>
            <Text>+</Text>
        </View>
    </Pressable>
);

export default ImageInput;
