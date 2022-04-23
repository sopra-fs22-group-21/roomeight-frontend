import { React, useState } from 'react';
import { Pressable } from 'react-native';

export const DoubleTap = (props) => {
    const [last, setLast] = useState(0);

    const handlePress = () => {
        console.log('pressed');
        const delta = new Date().getTime() - last;
        if (delta < props.delay) {
            console.log('double tap');
            props.doubleTap();
        }
        setLast(new Date().getTime());
    };

    return (
        <Pressable onPress={handlePress} {...props}>
            {props.children}
        </Pressable>
    );
};
