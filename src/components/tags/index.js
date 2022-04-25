import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import tagIcons from '../../resources/icons/tagIcons';
import TagElement from '../tagelement';
import styles from './styles';

const Tags = (props) => {
    const tagsToShow = props.tags ? props.tags : tagIcons;
    const selectedTags = tagsToShow.map((tag) => ({
        ...tag,
        isSelected: props.selected ? props.selected.includes(tag.name) : false,
    }));
    let values = {};
    selectedTags
        .filter((tag) => tag.isSelected)
        .map((tag) => {
            values[tag.name] = true;
        });
    const half = Math.ceil(selectedTags.length / 2);
    const left = selectedTags.slice(0, half);
    const right = selectedTags.slice(half, tagsToShow.length);
    const [tags, setTags] = useState({ ...values });

    const toggleSelect = (selected) => {
        if (props.onChange) {
            const t = { ...tags, ...selected };
            const tArray = Object.entries(t);
            props.onChange(
                tArray.filter((tag) => tag[1] === true).map((tag) => tag[0])
            );
            console.log(t);
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
                            preSelected={
                                props.preSelected
                                    ? (preSelected) =>
                                          checkPreSelect(preSelected)
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
