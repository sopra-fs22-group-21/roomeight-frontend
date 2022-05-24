import dateFormat from 'dateformat';
import { React, useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useComponentSize } from '../../hooks/layout';
import tagIcons from '../../resources/icons/tagIcons';
import en from '../../resources/strings/en.json';
import { SecondaryButton } from '../button';
import { DoubleTap } from '../doubleTap';
import { Gender } from '../gender';
import LikeNumbers from '../likeNumbers';
import { ProfilePicture } from '../profilePicture';
import Tags from '../tags';
import { Box, NormalText, PinkBackground, Strong, Title } from '../theme';
import styles from './styles';

const ITEM_WIDTH = Dimensions.get('window').width - 80;
const MAX_DESCRIPTION_LENGTH = 50;

export const SingleDetailCard = (props) => {
    const [contentSize, getContentSize] = useComponentSize();
    const [cardSize, getCardSize] = useComponentSize();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [profilePictureSize, getProfilePictureSize] = useComponentSize();
    const userprofile = props.userprofile;
    const ageInMilliseconds = new Date() - new Date(userprofile.birthday);
    const age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
    const selectedTags = userprofile.tags
        ? tagIcons.filter((tag) => userprofile.tags.includes(tag.name))
        : [];
    const [shortDescription, setShortDescription] = useState(false);

    useEffect(() => {
        setShortDescription(false);
    }, [userprofile]);

    const profilePictureAndBio = (
        <View style={styles.row} onLayout={getProfilePictureSize}>
            <View style={styles.column1}>
                <Pressable onPress={props.onPress} style={styles.image}>
                    <ProfilePicture
                        image={
                            userprofile.pictureReferences
                                ? userprofile.pictureReferences[0]
                                : null
                        }
                        style={styles.image}
                        initials={
                            userprofile.firstName
                                ? userprofile.firstName.charAt(0) +
                                  userprofile.lastName.charAt(0)
                                : ''
                        }
                    />
                </Pressable>
            </View>
            <View style={styles.column2}>
                <Title>{userprofile.firstName}</Title>
                <NormalText style={styles.text}>
                    <Gender
                        gender={userprofile.gender}
                        size={styles.genderIcon.fontSize}
                        style={styles.genderIcon}
                    />
                    {age} y/o{' '}
                </NormalText>
                <NormalText style={styles.text}>
                    {userprofile.biography}
                </NormalText>
            </View>
            {props.onClickEdit ? (
                <Icon
                    style={styles.icon}
                    name="edit"
                    type="feather"
                    size={20}
                    color={styles.icon.color}
                    onPress={props.onClickEdit}
                />
            ) : null}
            {props.preMatch ? (
                <LikeNumbers
                    style={styles.icon}
                    userprofile={userprofile}
                ></LikeNumbers>
            ) : null}
        </View>
    );

    const slicedDescription = () => {
        let sliced = userprofile.description;
        if (userprofile.description.length > MAX_DESCRIPTION_LENGTH) {
            sliced = sliced.replace(/(\r\n|\n|\r)/gm, ' ');
            sliced = sliced.substring(0, MAX_DESCRIPTION_LENGTH) + ' ... ';
        }
        return sliced;
    };

    const description = () => (
        <>
            {userprofile.description ? (
                <>
                    <Pressable
                        onPress={() =>
                            setShowFullDescription(!showFullDescription)
                        }
                    >
                        <Strong>{en.discover.description}</Strong>
                        <NormalText style={styles.text}>
                            {showFullDescription
                                ? userprofile.description
                                : slicedDescription()}
                        </NormalText>
                        <Box />
                    </Pressable>
                </>
            ) : null}
        </>
    );

    const dates = (
        <>
            {userprofile.moveInDate ? (
                <>
                    <Strong>{en.discover.moveInDate}</Strong>
                    <NormalText style={styles.text}>
                        {dateFormat(
                            new Date(userprofile.moveInDate),
                            'dd. mm. yyyy'
                        )}
                    </NormalText>
                    <Box />
                </>
            ) : null}

            {userprofile.moveOutDate ? (
                <>
                    <Strong>{en.discover.temporary}</Strong>
                    <NormalText style={styles.text}>
                        {dateFormat(
                            new Date(userprofile.moveOutDate),
                            'dd. mm. yyyy'
                        )}
                    </NormalText>
                    <Box />
                </>
            ) : null}
        </>
    );

    const tags = (
        <>
            {userprofile.tags && userprofile.tags.length > 0 ? (
                <>
                    <Strong>{en.discover.tags}</Strong>
                    <Tags tags={selectedTags} style={styles.tags} />
                    <Box />
                </>
            ) : null}
        </>
    );

    return (
        <PinkBackground style={props.preMatch ? styles.preMatch : null}>
            <DoubleTap
                doubleTap={props.onDoubleTap}
                delay={200}
                style={{ flex: 1 }}
            >
                <View style={styles.card}>
                    {profilePictureAndBio}
                    <Box />
                    {props.onClickMessage ? (
                        <Box>
                            <SecondaryButton
                                style={styles.messageButton}
                                onPress={props.onClickMessage}
                            >
                                message {userprofile.firstName}
                            </SecondaryButton>
                        </Box>
                    ) : null}
                    <ScrollView>
                        {description()}
                        {dates}
                        {tags}
                    </ScrollView>
                </View>
            </DoubleTap>
        </PinkBackground>
    );
};
