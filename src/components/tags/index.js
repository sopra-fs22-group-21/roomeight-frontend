import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { InputBox } from '../input';
import { Box } from '../theme';
import styles from './style';
import tags from '../../resources/icons/tags';
import { Icon } from 'react-native-elements';

const Tags = (props) => {
    const TagElement = (props) => (
        <View>
            <Icon name={props.icon} />
            <Text>{props.name}</Text>
        </View>
    );
    return (
        <InputBox>
            {props.tags.map((tag) => (
                <TagElement name={tag.name} icon={tag.icon} />
            ))}
        </InputBox>
    );
};

export default Tags;
