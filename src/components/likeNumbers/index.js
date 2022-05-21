import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicProfileCard } from '../publicProfileCard';
import { ScreenContainer } from '../screenContainer';
import { Box, SmallHeadingWithBack } from '../theme';
import { LikeButtons } from '../likeButtons';
import { goToChat } from '../../redux/actions/chatActions';
import en from '../../resources/strings/en.json';
import { postLikeUser } from '../../redux/actions/discoverActions';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const LikeNumbers = (props) => {
    //const { profile } = route.params;
    const dispatch = useDispatch();
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const userprofile = props.userprofile;
    const { likes } = useSelector((state) => state.likesState);

    console.log(userprofile);

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
    return (
        <View style={styles.row}>
            <Icon
                style={styles.icon}
                name="like"
                type="foundation"
                size={20}
                color={styles.icon.color}
                onPress={props.onClickShowLikes}
            />
            <Text style={styles.liked}>
                {countLikes(userprofile.profileId)}/
                {flatprofile.roomMates
                    ? Object.keys(flatprofile.roomMates).length
                    : null}
            </Text>
        </View>
    );
};

export default LikeNumbers;
