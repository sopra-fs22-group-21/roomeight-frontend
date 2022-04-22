import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, Share } from 'react-native';
import {
    Box,
    NormalText,
    PinkBackground,
    Strong,
    TextBlock,
    Title,
} from '../theme';
import { ProfilePicture } from '../profilePicture';
import en from '../../resources/strings/en.json';
import styles from './styles';
import Tags from '../tags';
import tags from '../../resources/strings/tags';
import tagIcons from '../../resources/icons/tagIcons';
import { DoubleTap } from '../doubleTap';

export const SingleDetailCard = (props) => {
    const userprofile = props.userprofile;
    const ageInMilliseconds = new Date() - new Date(userprofile.birthday);
    const age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
    const selectedTags = userprofile.tags
        ? tagIcons.filter((tag) => userprofile.tags.includes(tag.name))
        : [];
    return (
        <PinkBackground>
            <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                <View style={styles.row}>
                    <View style={{ ...styles.column, ...styles.column1 }}>
                        <Pressable onPress={props.onPress} style={styles.image}>
                            <ProfilePicture
                                image={userprofile.pictureReference[0]}
                                style={styles.image}
                            />
                        </Pressable>
                    </View>
                    <View style={{ ...styles.column, ...styles.column2 }}>
                        <Title>{userprofile.firstName}</Title>
                        <NormalText style={styles.text}>{age} y/o</NormalText>
                        <NormalText style={styles.text}>
                            {userprofile.gender}
                        </NormalText>
                        <NormalText style={styles.text}>
                            {userprofile.biography}
                        </NormalText>
                    </View>
                </View>
                <Box />
                <Strong>{en.discover.description}</Strong>
                <NormalText style={styles.text}>
                    {userprofile.description}
                </NormalText>
                <Box />
                <Strong>{en.discover.tags}</Strong>
                <Tags tags={selectedTags} style={styles.tags} />
                {props.children}
                <Box />
            </DoubleTap>
        </PinkBackground>
    );
};
