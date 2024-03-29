import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { Box } from '../theme';
import styles from './styles';

export const DislikeButton = (props) => (
    <Pressable
        style={(pressed) => [styles.dislikeButton, props.style]}
        {...props}
    >
        <Icon
            style={styles.icon}
            name="x"
            size={30}
            color={styles.dislikeButton.color}
            type="feather"
        />
    </Pressable>
);

export const LikeButton = (props) => (
    <Pressable style={(pressed) => [styles.likeButton, props.style]} {...props}>
        <Icon
            style={styles.icon}
            name="heart"
            size={25}
            color={styles.likeButton.color}
            type="font-awesome-5"
        />
    </Pressable>
);

export const LikeButtons = (props) => (
    <Box style={styles.container}>
        <DislikeButton onPress={props.onDislike} />
        <LikeButton onPress={props.onLike} />
    </Box>
);
