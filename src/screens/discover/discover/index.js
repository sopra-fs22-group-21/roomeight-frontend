import { React, useState, useRef } from 'react';
import { Dimensions, Pressable, Text, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
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

const ITEM_HEIGHT = Dimensions.get('window').height - 230;

const Discover = ({ navigation }) => {
    const carousel = useRef(null);
    const { discoverProfiles } = useSelector((state) => state.discoverState);
    const [like, setLike] = useState(false);
    const textIfNoData = 'Nothing to discover...';
    const [state, setState] = useState({
        profiles: discoverProfiles,
    });
    //const { userprofile } = useSelector((state) => state.userprofileState);

    const removeProfile = (index) => {
        if (index >= 0 && state.profiles.length > 1) {
            state.profiles.splice(index, 1);
            setState({ profiles: state.profiles });
            carousel.current.snapToItem(0, false);
        }
    };

    const handleLike = async () => {
        setLike(true);
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
            return <EmptyCard textIfNoData={textIfNoData} />;
        else
            return (
                <>
                    <PublicProfileCard
                        profile={item}
                        key={item.id}
                        onDoubleTap={handleLike}
                    />
                    <Box />
                    <LikeButtons
                        onLike={handleLike}
                        onDislike={handleDislike}
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
                data={state.profiles}
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
