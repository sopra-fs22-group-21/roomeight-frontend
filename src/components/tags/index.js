import React, { useState } from 'react';
import { View } from 'react-native';
import { InputBox } from '../input';
import styles from './style';
import tagIcons from '../../resources/icons/tagIcons';
import TagElement from '../tagelement';

const Tags = (props) => {
    const half = Math.ceil(tagIcons.length / 2);
    const left = tagIcons.slice(0, half);
    const right = tagIcons.slice(half, tagIcons.length);
    const [tags, setTags] = useState({});

    const toggleSelect = (selected) => {
        const t = { ...tags, ...selected };
        const tArray = Object.entries(t);
        props.onChange(
            tArray.filter((tag) => tag[1] === true).map((tag) => tag[0])
        );
        setTags(t);
    };

    return (
        <View style={styles.box}>
            <View style={styles.column}>
                <View style={styles.tagContainer}>
                    {left.map((tag) => (
                        <TagElement
                            key={tag.name}
                            tag={tag}
                            onChange={(selected) => toggleSelect(selected)}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.tagContainer}>
                    {right.map((tag) => (
                        <TagElement
                            key={tag.name}
                            tag={tag}
                            onChange={(selected) => toggleSelect(selected)}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default Tags;
