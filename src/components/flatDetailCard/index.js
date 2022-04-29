import { React, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, Dimensions } from 'react-native';
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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SecondaryButton } from '../button';
import { Icon } from 'react-native-elements';
import { AddressMap } from '../addressMap';
import { setCurrentScreen } from 'firebase/analytics';
import { Profiles } from '../profiles';

const ITEM_WIDTH = Dimensions.get('window').width - 80;

export const FlatDetailCard = (props) => {
    const flatprofile = props.flatprofile;
    const [current, setCurrent] = useState(0);

    const selectedTags = flatprofile.tags
        ? tagIcons.filter((tag) => flatprofile.tags.includes(tag.name))
        : [];

    const carousel = useRef(null);

    const firstPage = (
        <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
            <View style={styles.imageContainer}>
                <View style={{ flex: 2 }}>
                    <Pressable onPress={props.onPress}>
                        <ProfilePicture
                            image={
                                flatprofile.pictureReferences
                                    ? flatprofile.pictureReferences[0]
                                    : null
                            }
                            style={styles.image}
                            initials={flatprofile.name}
                        />
                    </Pressable>
                </View>
                {flatprofile.biography ? (
                    <View style={{ flex: 1 }}>
                        <Box />
                        <NormalText style={styles.text}>
                            {flatprofile.biography}
                        </NormalText>
                    </View>
                ) : null}

                {flatprofile.description ? (
                    <View style={{ flex: 1 }}>
                        <Strong style={styles.title}>
                            {en.discover.description}
                        </Strong>
                        <NormalText style={styles.text}>
                            {flatprofile.description}
                        </NormalText>
                    </View>
                ) : null}

                {flatprofile.tags.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <Strong>{en.discover.tags}</Strong>
                        <Tags tags={selectedTags} style={styles.tags} />
                    </View>
                ) : null}
            </View>
        </DoubleTap>
    );
    const secondPage = (
        <>
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Strong>{en.discover.roommates}</Strong>
                    <Profiles profiles={flatprofile.roomMates} />
                </ScrollView>
            </View>
            <DoubleTap
                doubleTap={props.onDoubleTap}
                delay={200}
                style={{ flex: 1 }}
            />
        </>
    );

    const thirdPage = (
        <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
            <Strong>{en.discover.location}</Strong>
            <NormalText>{flatprofile.address}</NormalText>
            <Box />
            <AddressMap address={flatprofile.address} />
        </DoubleTap>
    );

    const page = ({ item, index }) => {
        return item;
    };
    return (
        <PinkBackground>
            <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                <View style={styles.name}>
                    <Title>{flatprofile.name}</Title>
                </View>
            </DoubleTap>
            <Carousel
                ref={carousel}
                data={[firstPage, secondPage, thirdPage]}
                renderItem={page}
                sliderWidth={ITEM_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
                onSnapToItem={(index) => setCurrent(index)}
            />

            {props.onClickMessage ? (
                <View>
                    <Box />
                    <SecondaryButton
                        style={styles.messageButton}
                        onPress={props.onClickMessage}
                    >
                        message {flatprofile.name}
                    </SecondaryButton>
                </View>
            ) : null}
            {props.onClickEdit ? (
                <SecondaryButton
                    style={styles.editbutton}
                    onPress={props.onClickEdit}
                >
                    Edit Profile
                </SecondaryButton>
            ) : null}
            <Pagination
                dotsLength={3}
                activeDotIndex={current}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDots}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </PinkBackground>
    );
};
