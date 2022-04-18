import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './style';

const BasicButton = (props) => (
    <Pressable
        {...props}
        style={({ pressed }) => [
            styles.button,
            props.style,
            styles,
            props.disabled
                ? props.disabledStyle
                : pressed
                ? props.pressedStyle
                : '',
        ]}
    >
        {({ pressed }) => (
            <Text
                style={[
                    styles.label,
                    props.textStyle,
                    props.disabled
                        ? props.disabledTextStyle
                        : pressed
                        ? props.pressedTextStyle
                        : '',
                ]}
            >
                {props.children}
            </Text>
        )}
    </Pressable>
);

export const PrimaryButton = (props) => (
    <BasicButton
        {...props}
        style={styles.primary}
        disabledStyle={styles.primaryDisabled}
        pressedStyle={styles.primaryPressed}
        textStyle={styles.primaryLabel}
    >
        {props.children}
    </BasicButton>
);

export const SecondaryButton = (props) => (
    <BasicButton
        {...props}
        style={styles.secondary}
        disabledStyle={styles.secondaryDisabled}
        pressedStyle={styles.secondaryPressed}
        textStyle={styles.secondaryLabel}
        disabledTextStyle={styles.secondaryDisabledLabel}
        pressedTextStyle={styles.secondaryPressedLabel}
    >
        {props.children}
    </BasicButton>
);

export const GenderButton = (props) => (
    <BasicButton
        {...props}
        style={styles.gender}
        disabledStyle={styles.genderDisables}
        pressedStyle={styles.genderPressed}
    >
        {props.children}
    </BasicButton>
);
