import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import tagIcons from '../../resources/icons/tagIcons';
import TagElement from '../tagelement';
import styles from './styles';

const Tags = (props) => {
    const [tags, setTags] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    useEffect(() => {
        const tagsToShow = props.tags ? props.tags : tagIcons;
        const all = tagsToShow.map((tag) => ({
            ...tag,
            isSelected: props.selected
                ? props.selected.includes(tag.name)
                : false,
        }));
        let values = {};
        all.filter((tag) => tag.isSelected).map((tag) => {
            values[tag.name] = true;
        });
        const half = Math.ceil(all.length / 2);
        setLeft(all.slice(0, half));
        setRight(all.slice(half, all.length));
        setTags({ ...values });
    }, [props.selected, props.tags]);

    const toggleSelect = (selected) => {
        const t = { ...tags, ...selected };
        const tArray = Object.entries(t);
        props.onChange(
            tArray.filter((tag) => tag[1] === true).map((tag) => tag[0])
        );
        setTags(t);
    };

    return (
        <View style={{ ...styles.box, ...props.style }}>
            <View style={styles.column}>
                <View style={styles.tagContainer}>
                    {left.map((tag, i) => (
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
                    {right.map((tag, i) => (
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
