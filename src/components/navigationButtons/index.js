import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../resources/colors';
import styles from './styles';

export const BackButton = (props) => (
    <Pressable style={(pressed) => [styles.backButton, props.style]} {...props}>
        <Icon
            style={styles.icon}
            name="arrow-back"
            size={20}
            color={props.disabled ? colors.secondary200 : colors.primary700}
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
            name="arrow-forward"
            size={20}
            color={'white'}
        />
    </Pressable>
);

export const NavigationButtons = (props) => (
    <View style={styles.container}>
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
    </View>
);
