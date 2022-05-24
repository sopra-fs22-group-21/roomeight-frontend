import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikeButtons } from '../../../components/likeButtons';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeadingWithBack } from '../../../components/theme';
import { postLikeUser } from '../../../redux/actions/discoverActions';
import en from '../../../resources/strings/en.json';

const MatchInProgress = ({ route, navigation }) => {
    const { profile } = route.params;
    const dispatch = useDispatch();
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { likes } = useSelector((state) => state.likesState);

    const handleLike = async () => {
        dispatch(postLikeUser(profile.profileId));
        navigation.goBack();
    };

    const handleDislike = async () => {
        dispatch(postDislike(profile.profileId));
        navigation.goBack();
    };

    const isAlreadyLiked = () => {
        const usersThatLiked = likes.filter(
            (like) => Object.keys(like.likedUser)[0] === profile.profileId
        )[0].likes;
        return usersThatLiked.includes(userprofile.profileId);
    };

    return (
        <ScreenContainer showNavBar navigation={navigation}>
            <SmallHeadingWithBack navigation={navigation}>
                {en.matches.incompleteMatches}
            </SmallHeadingWithBack>
            <Box />
            <Box style={{ flex: 1 }}>
                <PublicProfileCard
                    profile={profile}
                    isFlat={profile.isAdvertisingRoom}
                    preMatch={() => {}}
                />
                <Box />
                {!isAlreadyLiked() ? (
                    <LikeButtons
                        onLike={handleLike}
                        onDislike={handleDislike}
                    />
                ) : null}
            </Box>
        </ScreenContainer>
    );
};
export default MatchInProgress;
