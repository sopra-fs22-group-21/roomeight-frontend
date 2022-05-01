import { React, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, Share, Dimensions } from 'react-native';
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
import { Icon } from 'react-native-elements';
import { SecondaryButton } from '../button';
import { Gender } from '../gender';
import dateFormat from 'dateformat';
import { useComponentSize } from '../../hooks/layout';
import consts from 'expo-cached-image/lib/consts';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const ITEM_WIDTH = Dimensions.get('window').width - 80;

export const SingleDetailCard = (props) => {
    const [contentSize, getContentSize] = useComponentSize();
    const [cardSize, getCardSize] = useComponentSize();
    const userprofile = props.userprofile;
    const ageInMilliseconds = new Date() - new Date(userprofile.birthday);
    const age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
    const selectedTags = userprofile.tags
        ? tagIcons.filter((tag) => userprofile.tags.includes(tag.name))
        : [];

    const [secondPageNeeded, setSecondPageNeeded] = useState(false);
    const carousel = useRef(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (
            contentSize.height > 0 &&
            cardSize.height > 0 &&
            contentSize.height > cardSize.height
        ) {
            setSecondPageNeeded(true);
        }
    }, [contentSize, cardSize]);

    useEffect(() => {
        if (props.onClickEdit) setSecondPageNeeded(false);
    }, [userprofile]);

    const profilePictureAndBio = (
        <View style={styles.row}>
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
        </View>
    );

    const firstPage = userprofile.description ? (
        <>
            <Strong>{en.discover.description}</Strong>
            <NormalText style={styles.text}>
                {userprofile.description}
            </NormalText>
            <Box />
        </>
    ) : null;

    const secondPage = (
        <>
            {userprofile.tags && userprofile.tags.length > 0 ? (
                <>
                    <Strong>{en.discover.tags}</Strong>
                    <Tags tags={selectedTags} style={styles.tags} />
                    <Box />
                </>
            ) : null}

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
        </>
    );

    const pagesCarousel = (
        <>
            <Carousel
                ref={carousel}
                data={[firstPage, secondPage]}
                renderItem={({ item }) => (
                    <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                        {item}
                    </DoubleTap>
                )}
                sliderWidth={ITEM_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
                onSnapToItem={(index) => setCurrent(index)}
            />
            <Pagination
                dotsLength={2}
                activeDotIndex={current}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDots}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </>
    );

    return (
        <PinkBackground>
            <View style={styles.card} onLayout={getCardSize}>
                <View style={{ flex: 0 }} onLayout={getContentSize}>
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

                    {secondPageNeeded ? (
                        pagesCarousel
                    ) : (
                        <>
                            {firstPage}
                            {secondPage}
                        </>
                    )}
                </View>
            </View>
        </PinkBackground>
    );
};
