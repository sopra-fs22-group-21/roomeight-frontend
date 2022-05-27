import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import styles from './styles';

const LikeNumbers = (props) => {
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const userprofile = props.userprofile;
    const { likes } = useSelector((state) => state.likesState);

    function countLikes(profileId) {
        if (likes) {
            const filtered = likes.filter((like) => {
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
                onPress={props.preMatch}
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
