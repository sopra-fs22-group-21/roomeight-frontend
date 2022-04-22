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
    Screen,
    SmallHeading,
} from '../../../components/theme';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import { ImageCard } from '../../../components/imageCard';
import userprofiles from '../../../resources/userprofiles';
import flatprofiles from '../../../resources/flatprofiles';
import {
    EmptyCard,
    PublicProfileCard,
} from '../../../components/publicProfileCard';
import { Icon } from 'react-native-elements';
import { View } from 'react-native-animatable';
import colors from '../../../resources/colors';
import { DoubleTap } from '../../../components/doubleTap';
import {
    TapGestureHandler,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { SecondaryButton } from '../../../components/button';

const ITEM_HEIGHT = Dimensions.get('window').height - 300;

const Discover = ({ navigation }) => {
    const carousel = useRef(null);
    const initialProfiles = flatprofiles;
    const [like, setLike] = useState(false);
    const [state, setState] = useState({
        profiles: [
            ...initialProfiles,
            { textIfNoData: 'Nothing to discover...' },
        ],
    });
    //const { userprofile } = useSelector((state) => state.userprofileState);

    const removeProfile = (index) => {
        if (index >= 0 && state.profiles.length > 1) {
            console.log('removing: ' + index);
            state.profiles.splice(index, 1);
            console.log(
                state.profiles.map((p) => p.firstName + ' ' + p.textIfNoData)
            );
            setState({ profiles: state.profiles });
            carousel.current.snapToItem(0, false);
        } else console.log('Why you go back');
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
            return <EmptyCard textIfNoData={item.textIfNoData} />;
        else
            return (
                <>
                    <PublicProfileCard
                        isFlat={initialProfiles == flatprofiles}
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
        <Screen navigation={navigation} showFooter>
            <Container style={styles.container}>
                <SmallHeading>Discover</SmallHeading>
                <Box />
                <Inner>
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
                    <Box style={styles.bottom}>
                        <SecondaryButton
                            onPress={() =>
                                setState({
                                    profiles: [
                                        ...initialProfiles,
                                        {
                                            textIfNoData:
                                                'Nothing to discover...',
                                        },
                                    ],
                                })
                            }
                        >
                            Reset
                        </SecondaryButton>
                    </Box>
                </Inner>
            </Container>
        </Screen>
    );
};

export default Discover;
