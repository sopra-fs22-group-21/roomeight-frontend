import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Box } from '../theme';
import styles from './style';

export const BackButton = (props) => (
    <Pressable style={(pressed) => [styles.backButton, props.style]} {...props}>
        <Icon
            style={styles.icon}
            name="arrow-back-ios"
            size={20}
            color={props.disabled ? '#b0c8cf' : '#0E7490'}
        />
    </Pressable>
);

export const NextButton = (props) => (
    <Pressable
        style={(pressed) => [
            styles.nextButton,
            props.style,
            props.disabled ? styles.disabled : pressed ? styles.pressed : '',
        ]}
        {...props}
    >
        <Icon
            style={styles.icon}
            name="arrow-forward-ios"
            size={20}
            color={'white'}
        />
    </Pressable>
);

export const NavigationButtons = (props) => (
    <Box style={styles.container}>
        {props.onPressBack != null ? (
            <BackButton onPress={props.onPressBack} />
        ) : (
            <View />
        )}
        {props.onPressNext != null ? (
            <NextButton
                onPress={props.onPressNext}
                disabled={props.nextDisabled}
            />
        ) : (
            <View />
        )}
    </Box>
);
