import React, { useState } from 'react';
import { View } from 'react-native';
import tagIcons from '../../resources/icons/tagIcons';
import TagElement from '../tagelement';
import styles from './styles';

const Tags = (props) => {
    const tagsToShow = props.tags ? props.tags : tagIcons;
    const half = Math.ceil(tagsToShow.length / 2);
    const left = tagsToShow.slice(0, half);
    const right = tagsToShow.slice(half, tagsToShow.length);
    const [tags, setTags] = useState({});

    const toggleSelect = (selected) => {
        if (props.onChange) {
            const t = { ...tags, ...selected };
            const tArray = Object.entries(t);
            props.onChange(
                tArray.filter((tag) => tag[1] === true).map((tag) => tag[0])
            );
            setTags(t);
        }
    };

    return (
        <View style={{ ...styles.box, ...props.style }}>
            <View style={styles.column}>
                <View style={styles.tagContainer}>
                    {left.map((tag) => (
                        <TagElement
                            key={tag.name}
                            tag={tag}
                            onChange={
                                props.onChange
                                    ? (selected) => toggleSelect(selected)
                                    : null
                            }
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
                            onChange={
                                props.onChange
                                    ? (selected) => toggleSelect(selected)
                                    : null
                            }
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default Tags;
