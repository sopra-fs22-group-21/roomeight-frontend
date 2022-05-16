import { React, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import FilterSettings from '../../../components/filterSettings';
import { ItsAMatch } from '../../../components/itsAMatch';
import { LikeButtons } from '../../../components/likeButtons';
import {
    EmptyCard,
    PublicProfileCard,
} from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeading } from '../../../components/theme';
import { useComponentSize } from '../../../hooks/layout';
import { goToChat } from '../../../redux/actions/chatActions';
import {
    postLikeFlat,
    postLikeUser,
    updateDiscoverProfiles,
} from '../../../redux/actions/discoverActions';
import { updateProfile } from '../../../redux/actions/updateActions';
import * as Constants from '../../../redux/constants';
import colors from '../../../resources/colors';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const ITEM_HEIGHT = Dimensions.get('screen').height - 170;

const Discover = ({ navigation }) => {
    const [cardSize, getCardSize] = useComponentSize();
    const dispatch = useDispatch();
    const carousel = useRef(null);
    const { discoverProfiles, loading, newMatch } = useSelector(
        (state) => state.discoverState
    );
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [profiles, setProfiles] = useState(discoverProfiles);
    const [like, setLike] = useState(false);
    const [showLikes, setShowLike] = useState(false);
    const { matches } = useSelector((state) => state.matchesState);
    const [match, setMatch] = useState(undefined);
    const [isShowingSettings, setIsShowingSettings] = useState(false);
    //const [filterTags, setFilterTags] = useState(null);

    useEffect(() => {
        if (newMatch) setMatch(matches[newMatch]);
        console.log('newmatch: ');
        console.log(newMatch);
    }, [matches]);

    useEffect(() => {
        if (!isShowingSettings) {
            if (loading || !discoverProfiles)
                setProfiles([{ textIfNoData: en.discover.loading }]);
            else
                setProfiles(
                    discoverProfiles.concat([
                        { textIfNoData: en.discover.empty },
                    ])
                );
            carousel.current.snapToItem(0, false);
        }
    }, [loading, discoverProfiles, isShowingSettings]);

    const removeProfile = (index) => {
        if (index >= 0 && profiles.length > 0) {
            const prof = [...discoverProfiles];
            prof.splice(index, 1);
            dispatch(updateDiscoverProfiles(prof));
        }
    };

    const handleLike = async (profileId) => {
        setLike(true);
        if (userprofile.isSearchingRoom) dispatch(postLikeFlat(profileId));
        else dispatch(postLikeUser(profileId));
        setTimeout(() => {
            setLike(false);
            carousel.current.snapToNext();
        }, 500);
    };

    function countLikes(profileId) {
        if (flatprofile.likes) {
            const filtered = flatprofile.likes.filter((like) => {
                return Object.keys(like.likedUser)[0] === profileId;
            });
            if (filtered.length !== 0) {
                return filtered[0].likes.length;
            } else {
                return 0;
            }
        } else {
            return null;
        }
    }

    const handleDislike = () => {
        carousel.current.snapToNext();
    };

    const card = ({ item }) => {
        if (!item) return null;
        if (item && item.textIfNoData)
            return <EmptyCard textIfNoData={item.textIfNoData} />;
        else
            return (
                <View style={{ height: '100%' }}>
                    <Box style={{ flex: 1, flexGrow: 1 }}>
                        <PublicProfileCard
                            profile={item}
                            key={item.profileId}
                            onDoubleTap={() => handleLike(item.profileId)}
                            onClickShowLikes={() => {
                                setShowLike(true);
                            }}
                            nrLiked={countLikes(item.profileId)}
                            nrRoommates={
                                flatprofile.roomMates
                                    ? Object.keys(flatprofile.roomMates).length
                                    : null
                            }
                        />
                    </Box>
                    <LikeButtons
                        onLike={() => handleLike(item.profileId)}
                        onDislike={() => handleDislike()}
                    />
                    {like ? (
                        <View style={styles.like}>
                            <Icon name="favorite" size={200} color={'white'} />
                        </View>
                    ) : null}
                </View>
            );
    };

    const profileCarousel = (
        <>
            <Carousel
                ref={carousel}
                data={profiles}
                renderItem={card}
                sliderHeight={
                    cardSize.height ? cardSize.height - 70 : ITEM_HEIGHT
                }
                itemHeight={
                    cardSize.height ? cardSize.height - 70 : ITEM_HEIGHT
                }
                activeSlideAlignment="start"
                inactiveSlideShift={0}
                useScrollView
                vertical
                onSnapToItem={(index) => removeProfile(index - 1)}
            />
        </>
    );

    const settings = (
        <>
            <FilterSettings
                onSave={(fil, fTags) => {
                    //setFilterTags(fTags);

                    dispatch(
                        updateProfile(
                            { filters: { ...fil } },
                            'userprofile',
                            userprofile.profileId
                        )
                    );
                    setIsShowingSettings(false);
                    console.log(fil);
                }}
                filters={userprofile.filters}
            />
        </>
    );

    const filtersAreActive = () => {
        let active =
            !isShowingSettings &&
            userprofile.filters &&
            Object.values(userprofile.filters).some(
                (f) =>
                    f != undefined &&
                    f != null &&
                    Object.values(f).some(
                        (child) => child != undefined && child != null
                    )
            );
        return active;
    };

    return (
        <>
            <ScreenContainer navigation={navigation} showNavBar>
                <View
                    style={{ height: '100%', flex: 1 }}
                    onLayout={getCardSize}
                >
                    <View style={styles.headingRow}>
                        <SmallHeading>
                            {isShowingSettings ? 'Set Filters' : 'Discover'}
                        </SmallHeading>
                        <Icon
                            name={isShowingSettings ? 'close' : 'tune'}
                            size={30}
                            color={
                                filtersAreActive() ? colors.primary400 : 'black'
                            }
                            onPress={() =>
                                setIsShowingSettings(!isShowingSettings)
                            }
                        />
                    </View>
                    <Box />
                    {isShowingSettings ? (
                        settings
                    ) : (
                        <>
                            {/*filterTags*/}
                            {profileCarousel}
                        </>
                    )}
                </View>
            </ScreenContainer>
            {match ? (
                <ItsAMatch
                    profile={match}
                    navigation={navigation}
                    onPressMessage={() =>
                        dispatch(goToChat(match.profileId, navigation))
                    }
                    onDiscard={() => {
                        setMatch(null);
                        dispatch({
                            type: Constants.MATCH_IS_VIEWED,
                        });
                    }}
                />
            ) : null}
        </>
    );
};

export default Discover;
