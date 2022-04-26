import { React, useState, useRef, useEffect } from 'react';
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
} from '../../../redux/actions/discoverActions';

const ITEM_HEIGHT = Dimensions.get('window').height - 230;

const Discover = ({ navigation }) => {
    const dispatch = useDispatch();
    const carousel = useRef(null);
    const { discoverProfiles, loading } = useSelector(
        (state) => state.discoverState
    );
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [profiles, setProfiles] = useState(discoverProfiles);
    const [like, setLike] = useState(false);

    const getProfiles = () => {
        if (profiles.length > 0) return profiles;
        if (loading) return [{ textIfNoData: en.discover.loading }];
        return [{ textIfNoData: en.discover.empty }];
    };

    const removeProfile = (index) => {
        if (index >= 0 && profiles.length > 0) {
            const prof = [...profiles];
            prof.splice(index, 1);
            setProfiles(prof);
            carousel.current.snapToItem(0, false);
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
                <>
                    <PublicProfileCard
                        profile={item}
                        key={index}
                        onDoubleTap={() => handleLike(item.profileId)}
                    />
                    <Box />
                    <LikeButtons
                        onLike={() => handleLike(item.profileId)}
                        onDislike={() => handleDislike()}
                    />
                    {like ? (
                        <View style={styles.like}>
                            <Icon name="favorite" size={200} color={'white'} />
                        </View>
                    ) : null}
                </>
            );
    };

    return (
        <Container navigation={navigation} showNavBar>
            <SmallHeading>Discover</SmallHeading>
            <Box />
            <Carousel
                ref={carousel}
                data={getProfiles()}
                renderItem={card}
                sliderHeight={ITEM_HEIGHT}
                itemHeight={ITEM_HEIGHT}
                inactiveSlideShift={0}
                useScrollView={true}
                vertical
                onSnapToItem={(index) => removeProfile(index - 1)}
            />
        </Container>
    );
};

export default Discover;
