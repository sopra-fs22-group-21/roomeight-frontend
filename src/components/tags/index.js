import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { InputBox } from '../input';
import { Box } from '../theme';
import styles from './style';
import tags from '../../resources/icons/tags';
import { Icon } from 'react-native-elements';
import { Pressable } from 'react-native';

const Tags = (props) => {
    const TagElement = (props) => (
        <View style={styles.tagElement}>
            <Pressable>
                <Icon style={styles.icon} name={props.icon} size={20} />
                <Text style={styles.text}>{props.name}</Text>
            </Pressable>
        </View>
    );
    const half = Math.ceil(props.tags.length / 2);
    const left = props.tags.slice(0, half);
    const right = props.tags.slice(-half);
    return (
        <InputBox label={'Tags'}>
            <View style={styles.box}>
                <View style={styles.column}>
                    <View style={styles.tagContainer}>
                        {left.map((tag) => (
                            <TagElement
                                key={tag.name}
                                name={tag.name}
                                icon={tag.icon}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={styles.tagContainer}>
                        {right.map((tag) => (
                            <TagElement
                                key={tag.name}
                                name={tag.name}
                                icon={tag.icon}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </InputBox>
    );
};

export default Tags;
