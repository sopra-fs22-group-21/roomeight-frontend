import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import tagIcons from '../../resources/icons/tagIcons';
import TagElement from '../tagelement';
import styles from './styles';

const Tags = (props) => {
    const tagsToShow = props.tags ? props.tags : tagIcons;
    const allTags = tagsToShow.map((tag) => ({
        ...tag,
        isSelected: props.selected ? props.selected.includes(tag.name) : false,
    }));
    let values = {};
    allTags
        .filter((tag) => tag.isSelected)
        .map((tag) => {
            values[tag.name] = true;
        });
    const [tags, setTags] = useState({ ...values });

    const toggleSelect = (selected) => {
        const t = { ...tags, ...selected };
        const tArray = Object.entries(t);
        props.onChange(
            tArray.filter((tag) => tag[1] === true).map((tag) => tag[0])
        );
        setTags(t);
    };

    const getLeft = (list) => {
        const half = Math.ceil(list.length / 2);
        return list.slice(0, half);
    };

    const getRight = (list) => {
        const half = Math.ceil(list.length / 2);
        return list.slice(half, list.length);
    };

    return (
        <View style={{ ...styles.box, ...props.style }}>
            <View style={styles.column}>
                <View style={styles.tagContainer}>
                    {getLeft(allTags).map((tag, i) => (
                        <TagElement
                            key={tag.name + i}
                            tag={tag}
                            onChange={
                                props.onChange
                                    ? (selected) => toggleSelect(selected)
                                    : undefined
                            }
                        />
                    ))}
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.tagContainer}>
                    {getRight(allTags).map((tag, i) => (
                        <TagElement
                            key={tag.name + i}
                            tag={tag}
                            onChange={
                                props.onChange
                                    ? (selected) => toggleSelect(selected)
                                    : undefined
                            }
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default Tags;
