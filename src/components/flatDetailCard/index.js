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
import colors from '../../resources/colors';
import Geocoder from 'react-native-geocoding';
import { AddressMap } from '../addressMap';
import { setCurrentScreen } from 'firebase/analytics';
import { Profiles } from '../profiles';

const ITEM_WIDTH = Dimensions.get('window').width - 80;

export const FlatDetailCard = (props) => {
    const flatprofile = props.flatprofile;
    const [current, setCurrent] = useState(0);

    const selectedTags = tagIcons.filter((tag) =>
        flatprofile.tags.includes(tag.name)
    );
    const carousel = useRef(null);

    const firstPage = (
        <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
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
            <Box />
            <Box />
        </DoubleTap>
    );
    const secondPage = (
        <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Strong>{en.discover.roommates}</Strong>
                <Profiles profiles={flatprofile.roommates} />
            </ScrollView>
        </DoubleTap>
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
                <Box>
                    <SecondaryButton
                        style={styles.messageButton}
                        onPress={props.onClickEdit}
                    >
                        Edit Profile
                    </SecondaryButton>
                </Box>
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
