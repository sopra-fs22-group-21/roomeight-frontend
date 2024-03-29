import React from 'react';
import { Pressable, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const BasicButton = (props) => (
    <Pressable
        {...props}
        style={({ pressed }) => {
            const basicStyles = {
                ...styles.button,
                ...props.style,
                ...styles,
            };
            if (props.disabled)
                return { ...basicStyles, ...props.disabledStyle };
            if (pressed) return { ...basicStyles, ...props.pressedStyle };
            return basicStyles;
        }}
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
        style={{ ...styles.primary, ...props.style }}
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
        style={{ ...styles.secondary, ...props.style }}
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
        style={{ ...styles.gender, ...props.style }}
        disabledStyle={styles.genderDisables}
        pressedStyle={styles.genderPressed}
    >
        {props.children}
    </BasicButton>
);

export const CreateNewChatButton = (props) => (
    <Pressable onPress={props.onPress}>
        <Icon name="add-box" type="material" size={30} color="black" />
    </Pressable>
);
