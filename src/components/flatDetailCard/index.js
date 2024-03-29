import dateFormat from 'dateformat';
import { React, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import tagIcons from '../../resources/icons/tagIcons';
import en from '../../resources/strings/en.json';
import { AddressMap } from '../addressMap';
import { SecondaryButton } from '../button';
import { DoubleTap } from '../doubleTap';
import { ProfilePicture } from '../profilePicture';
import { Profiles } from '../profiles';
import Tags from '../tags';
import { Box, NormalText, PinkBackground, Strong, Title } from '../theme';
import styles from './styles';

const ITEM_WIDTH = Dimensions.get('window').width - 80;

export const FlatDetailCard = (props) => {
    const flatprofile = props.flatprofile;
    const [current, setCurrent] = useState(0);

    const selectedTags = flatprofile.tags
        ? tagIcons.filter((tag) => flatprofile.tags.includes(tag.name))
        : [];

    const carousel = useRef(null);

    const flatInfos = () => {
        let flatInfos = [];
        if (flatprofile.moveInDate) {
            flatInfos.push({
                key: 0,
                label: en.roomInfo.moveInDate,
                value: dateFormat(
                    new Date(flatprofile.moveInDate),
                    'dd. mm. yyyy'
                ),
            });
        }
        if (!flatprofile.permanent && flatprofile.moveOutDate) {
            flatInfos.push({
                key: 1,
                label: en.discover.temporary,
                value: dateFormat(
                    new Date(flatprofile.moveOutDate),
                    'dd. mm. yyyy'
                ),
            });
        }
        if (flatprofile.rent) {
            flatInfos.push({
                key: 2,
                label: en.roomInfo.rent,
                value: flatprofile.rent + ' CHF',
            });
        }
        if (flatprofile.roomSize) {
            flatInfos.push({
                key: 3,
                label: en.roomInfo.roomSize,
                value: flatprofile.roomSize + ' m\u00b2',
            });
        }
        if (flatprofile.numberOfBaths) {
            flatInfos.push({
                key: 4,
                label: en.roomInfo.nrBathrooms,
                value: flatprofile.numberOfBaths,
            });
        }
        return flatInfos;
    };

    const firstPage = (
        <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
            <View style={{ height: '100%' }}>
                {flatprofile.biography ? (
                    <Box>
                        <NormalText
                            style={{ ...styles.text, textAlign: 'center' }}
                        >
                            {flatprofile.biography}
                        </NormalText>
                    </Box>
                ) : null}
                <View style={{ flexShrink: 1 }}>
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
                <Box />
                <View>
                    {flatprofile.description ? (
                        <Box>
                            <NormalText style={styles.text}>
                                {flatprofile.description}
                            </NormalText>
                        </Box>
                    ) : null}

                    {flatprofile.tags && flatprofile.tags.length > 0 ? (
                        <Box>
                            <Strong>{en.discover.tags}</Strong>
                            <Tags tags={selectedTags} style={styles.tags} />
                        </Box>
                    ) : null}

                    <FlatList
                        data={flatInfos()}
                        numColumns={2}
                        columnWrapperStyle={{}}
                        contentContainerStyle={{
                            alignItems: 'stretch',
                            justifyContent: 'space-between',
                            maxHeight: '100%',
                            flexGrow: 1,
                        }}
                        renderItem={({ item }) => {
                            return item ? (
                                <View style={{ width: '50%' }} key={item.key}>
                                    <Strong style={styles.title}>
                                        {item.label}
                                    </Strong>
                                    <NormalText style={styles.text}>
                                        {item.value}
                                    </NormalText>
                                </View>
                            ) : null;
                        }}
                        useScrollView
                        scrollEnabled
                    />
                </View>
            </View>
        </DoubleTap>
    );
    const secondPage = (
        <>
            <View style={{ flex: 1 }}>
                <Box style={{ flexShrink: 1 }}>
                    <Strong>{en.discover.roommates}</Strong>
                    <Profiles profiles={flatprofile.roomMates} />
                    {props.onClickAddRoomie ? (
                        <Pressable onPress={props.onClickAddRoomie}>
                            <Icon
                                name="plus-circle"
                                type="feather"
                                size={25}
                                color={styles.icon.color}
                            />
                        </Pressable>
                    ) : null}
                </Box>
                <DoubleTap
                    doubleTap={props.onDoubleTap}
                    delay={200}
                    style={{ flex: 1 }}
                >
                    {flatprofile.numberOfRoommates ? (
                        <Box>
                            <Strong style={styles.title}>
                                {en.discover.nrRoommates}
                            </Strong>
                            <NormalText style={styles.text}>
                                {flatprofile.numberOfRoommates}
                            </NormalText>
                        </Box>
                    ) : null}
                </DoubleTap>
            </View>
        </>
    );

    const thirdPage = (
        <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
            <Strong>{en.discover.location}</Strong>
            <NormalText>{flatprofile.address}</NormalText>
            <Box />
            {flatprofile.addressCoordinates ? (
                <AddressMap
                    resolveAddress={false}
                    latitude={flatprofile.addressCoordinates.latitude}
                    longitude={flatprofile.addressCoordinates.longitude}
                />
            ) : null}
        </DoubleTap>
    );

    const page = ({ item, index }) => {
        return item;
    };
    return (
        <PinkBackground>
            <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                {props.onClickEdit ? (
                    <View style={styles.row}>
                        <Box />
                        <View style={styles.name}>
                            <Title>{flatprofile.name}</Title>
                        </View>
                        <Pressable
                            onPress={props.onClickEdit}
                            style={styles.icon}
                        >
                            <Icon
                                name="edit"
                                type="feather"
                                size={20}
                                color={styles.icon.color}
                            />
                        </Pressable>
                    </View>
                ) : (
                    <View style={{ alignSelf: 'center' }}>
                        <Title>{flatprofile.name}</Title>
                    </View>
                )}
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
