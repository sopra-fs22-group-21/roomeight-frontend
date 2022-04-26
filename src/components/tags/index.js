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
            <FlatList
                data={allTags}
                keyExtractor={(item) => item.name}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    flex: 1,
                    width: '100%',
                }}
                renderItem={({ item }) => (
                    <View style={styles.columnItem}>
                        <TagElement
                            tag={item}
                            onChange={
                                props.onChange
                                    ? (selected) => toggleSelect(selected)
                                    : null
                            }
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default Tags;
