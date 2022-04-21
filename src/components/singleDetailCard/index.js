import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, Share } from 'react-native';
import { Box, NormalText, PinkBackground, TextBlock, Title } from '../theme';
import { ProfilePicture } from '../profilePicture';
import en from '../../resources/strings/en.json';
import styles from './styles';
import Tags from '../tags';
import tags from '../../resources/strings/tags';
import tagIcons from '../../resources/icons/tagIcons';
import { InputBox, InputLabel } from '../input';
import { SharedElement } from 'react-navigation-shared-element';

export const SingleDetailCard = (props) => {
    const userprofile = props.userprofile;
    const ageInMilliseconds = new Date() - new Date(userprofile.birthday);
    const age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
    const selectedTags = tagIcons.filter((tag) =>
        userprofile.tags.includes(tag.name)
    );
    return (
        <PinkBackground>
            <View style={styles.row}>
                <View style={{ ...styles.column, ...styles.column1 }}>
                    <SharedElement id={'profilePicture0'}>
                        <Pressable onPress={props.onPress} style={styles.image}>
                            <ProfilePicture
                                image={userprofile.pictureReference[0]}
                                style={styles.image}
                            />
                        </Pressable>
                    </SharedElement>
                    <SharedElement id={'gradient0'} />
                </View>
                <View style={{ ...styles.column, ...styles.column2 }}>
                    <SharedElement id={'firstName'}>
                        <Title>{userprofile.firstName}</Title>
                    </SharedElement>
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
            <SharedElement id={'descriptionLabel'}>
                <InputLabel>{en.discover.description}</InputLabel>
            </SharedElement>
            <SharedElement id={'description'}>
                <NormalText style={styles.text}>
                    {userprofile.description}
                </NormalText>
            </SharedElement>
            <Box />
            <InputLabel>{en.discover.tags}</InputLabel>
            <Tags tags={selectedTags} style={styles.tags} />
            {props.children}
            <Box />
        </PinkBackground>
    );
};
