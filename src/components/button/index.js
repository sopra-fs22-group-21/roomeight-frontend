import React from 'react';
import { Pressable, Text } from 'react-native';
import { Box } from '../theme';
import styles from './style'

export const PrimaryButton = (props) => 
        <Box>
            <Pressable onPress={props.onPress} 
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? "#0c6076" : "#0E7490",
                }, styles.primary]}>
                <Text style={styles.label}>{props.children}</Text>
            </Pressable>
        </Box>
