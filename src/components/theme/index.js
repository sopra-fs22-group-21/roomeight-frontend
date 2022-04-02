import React from 'react';
import { View, Text } from 'react-native';
import styles from './style'

export const Heading = (props) => {
return props.hidden ? <Box/> : (
    <Box style={global.textBox}>
        <Text style={{...styles.heading, ...props.style}}>{props.children}</Text>
    </Box>
)};

export const Title = (props) => 
        <Box style={styles.textBox}>
            <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
        </Box>

export const TextBlock = (props) => 
    <Box style={styles.textBox}>
        <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    </Box>

export const Box = (props) => 
    <View style={styles.textBox}>{props.children}</View>