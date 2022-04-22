import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable } from 'react-native';
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
import { InputBox, InputLabel } from '../input';
import { DoubleTap } from '../doubleTap';
import { ScrollView } from 'react-native-gesture-handler';
import { RoommateInfoBox } from '../roommateInfoBox';

export const FlatDetailCard = (props) => {
    const flatprofile = props.flatprofile;
    const selectedTags = tagIcons.filter((tag) =>
        flatprofile.tags.includes(tag.name)
    );
    return (
        <PinkBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                    <View style={styles.name}>
                        <Title>{flatprofile.name}</Title>
                    </View>
                    <Pressable onPress={props.onPress} style={styles.image}>
                        <ProfilePicture
                            image={flatprofile.pictureReference[0]}
                            style={styles.image}
                        />
                    </Pressable>
                    <Box />
                    <Strong>{en.discover.description}</Strong>
                    <NormalText style={styles.text}>
                        {flatprofile.description}
                    </NormalText>
                    <Box />
                    <Strong>{en.discover.tags}</Strong>
                    <Tags tags={selectedTags} style={styles.tags} />
                    <Box />
                    <Strong>{en.discover.roommates}</Strong>
                    {flatprofile.roommates.map((roomie) => (
                        <RoommateInfoBox roomie={roomie} key={roomie.id} />
                    ))}
                </DoubleTap>
            </ScrollView>
        </PinkBackground>
    );
};
