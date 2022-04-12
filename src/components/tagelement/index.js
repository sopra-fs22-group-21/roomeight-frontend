import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from './style';
import { Icon } from 'react-native-elements';
import { Pressable } from 'react-native';

const TagElement = (props) => {
    const [tag, setTag] = useState(props.tag);
    const handlePress = () => {
        let selected = {};
        selected[tag.name] = !tag.isSelected;
        props.onChange(selected);
        setTag({ ...tag, isSelected: !tag.isSelected });
    };

    return (
        <View>
            <Pressable style={styles.tagElement} onPress={handlePress}>
                <Icon
                    style={styles.icon}
                    name={tag.icon}
                    type={tag.type}
                    size={20}
                    color={tag.isSelected ? '#0E7490' : 'black'}
                />
                <Text
                    style={
                        tag.isSelected
                            ? { ...styles.text, ...styles.selected }
                            : styles.text
                    }
                >
                    {tag.label}
                </Text>
            </Pressable>
        </View>
    );
};
export default TagElement;
