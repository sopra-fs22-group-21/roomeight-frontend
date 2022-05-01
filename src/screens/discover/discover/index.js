import { React, useState, useRef, useEffect, useCallback } from 'react';
import { Dimensions, Pressable, Text, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SingleDetailCard } from '../../../components/singleDetailCard';
import { LikeButton, LikeButtons } from '../../../components/likeButtons';
import { ProfilePicture } from '../../../components/profilePicture';
import {
    Box,
    Container,
    Heading,
    Inner,
    SmallHeading,
} from '../../../components/theme';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import {
    EmptyCard,
    PublicProfileCard,
} from '../../../components/publicProfileCard';
import { Icon } from 'react-native-elements';
import { View } from 'react-native-animatable';
import en from '../../../resources/strings/en.json';
import {
    postLikeFlat,
    postLikeUser,
    updateDiscoverProfiles,
} from '../../../redux/actions/discoverActions';
import { ScreenContainer } from '../../../components/screenContainer';
import { useComponentSize } from '../../../hooks/layout';

const ITEM_HEIGHT = Dimensions.get('screen').height - 170;

const Discover = ({ navigation }) => {
    const [cardSize, getCardSize] = useComponentSize();
    const dispatch = useDispatch();
    const carousel = useRef(null);
    const { discoverProfiles, loading } = useSelector(
        (state) => state.discoverState
    );
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [profiles, setProfiles] = useState(discoverProfiles);
    const [like, setLike] = useState(false);

    useEffect(() => {
        if (loading) setProfiles([{ textIfNoData: en.discover.loading }]);
        else
            setProfiles(
                discoverProfiles.concat([{ textIfNoData: en.discover.empty }])
            );
        carousel.current.snapToItem(0, false);
    }, [loading]);

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

    const handleDislike = () => {
        carousel.current.snapToNext();
    };

    const card = ({ item, index }) => {
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

    return (
        <ScreenContainer navigation={navigation} showNavBar>
            <View style={{ height: '100%', flex: 1 }} onLayout={getCardSize}>
                <SmallHeading>Discover</SmallHeading>
                <Box />
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
            </View>
        </ScreenContainer>
    );
};

export default Discover;
