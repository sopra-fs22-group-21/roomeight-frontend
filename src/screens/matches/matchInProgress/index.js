import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeadingWithBack } from '../../../components/theme';
import { LikeButtons } from '../../../components/likeButtons';
import { goToChat } from '../../../redux/actions/chatActions';
import en from '../../../resources/strings/en.json';
import { postLikeUser } from '../../../redux/actions/discoverActions';

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

    function countLikes() {
        if (flatprofile.likes) {
            const filtered = flatprofile.likes.filter((like) => {
                return Object.keys(like.likedUser)[0] === profile.profileId;
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
                    nrLiked={countLikes()}
                    nrRoommates={Object.keys(flatprofile.roomMates).length}
                    onClickShowLikes={() => {}}
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
