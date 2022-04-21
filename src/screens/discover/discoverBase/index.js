import { React, useState, useRef } from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { SingleDetailCard } from '../../../components/singleDetailCard';
import { LikeButton, LikeButtons } from '../../../components/likeButtons';
import { SharedElement } from 'react-navigation-shared-element';
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
const ITEM_HEIGHT = Dimensions.get('window').height - 350;

const DiscoverBase = (props) => {
    const carousel = useRef(null);
    let john = { ...props.userprofile };
    let luisa = { ...props.userprofile };
    luisa.pictureReference = [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFuJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://vc-smash.ch/img/asset/YXNzZXRzL3RlYW1mb3Rvcy9ENC0yMDIxLTIyLmpwZWc=?fit=crop-51-34-1&w=1800&h=600&dpr=2&fm=webp&s=58a5b80a46d99ae2bc0cf8dba5ae34c4',
    ];
    john.gender = 'Male';
    john.firstName = 'John';
    john.pictureReference = [
        'https://www.mensjournal.com/wp-content/uploads/mf/1280-selfie.jpg?w=1200&quality=86&strip=all',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    ];
    john.description = `Hi, I'm John, I'm super fun and cool. I am looking for a place to stay for the next 4 weeks since I am only in town for an internship. Love to meet new people and have some fun`;

    let marco = { ...john };
    marco.firstName = 'Marco';
    marco.pictureReference = [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
        'https://www.mensjournal.com/wp-content/uploads/mf/1280-selfie.jpg?w=1200&quality=86&strip=all',
    ];
    const initialProfiles = [luisa, john, marco];
    const [state, setState] = useState({ profiles: initialProfiles });
    const removeProfile = (index) => {
        if (index >= 0) {
            console.log('removing: ' + index);
            state.profiles.splice(index, 1);
            console.log(state.profiles.map((p) => p.firstName));
            setState({ profiles: state.profiles });
            carousel.current.snapToItem(0, false);
        } else console.log('Why you go back');
    };

    const card = ({ item, index }) => {
        console.log(index);
        if (props.isImage && index == 0)
            return (
                <SharedElement
                    id={props.userprofile.email + 'card'}
                    style={{ flex: 1 }}
                >
                    <ImageCard
                        userprofile={item}
                        onPress={props.onPressImage}
                    />
                </SharedElement>
            );
        else
            return (
                <SharedElement id={props.userprofile.email + 'card'}>
                    <SingleDetailCard
                        userprofile={item}
                        onPress={props.onPressDetail}
                    />
                </SharedElement>
            );
    };

    return (
        <Screen navigation={props.navigation} showFooter>
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
                    <Box />
                    <SharedElement id={'likeButtons'}>
                        <LikeButtons
                            onLike={() => console.log('liked')}
                            onDislike={() => console.log('disliked')}
                        />
                    </SharedElement>
                </Inner>
            </Container>
        </Screen>
    );
};

export default DiscoverBase;
