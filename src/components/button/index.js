import React from 'react';
import { Pressable, Text } from 'react-native';
import { Box } from '../theme';
import styles from './style';

export const PrimaryButton = (props) => (
    <Box>
        <Pressable
            {...props}
            style={({ pressed }) => [
                styles.primary,
                props.style,
                props.disabled
                    ? styles.disabled
                    : pressed
                    ? styles.pressed
                    : styles.unpressed,
            ]}
        >
            <Text style={styles.label}>{props.children}</Text>
        </Pressable>
    </Box>
);
