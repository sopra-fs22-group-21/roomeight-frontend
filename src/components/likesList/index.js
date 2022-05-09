import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Profiles } from '../profiles';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';
import { Box } from '../theme';

const LikesList = (props) => {
    const flatprofile = props.flatprofile;
    console.log(props.roomMates);
    return (
        <View>
            <View style={styles.horizontal}>
                <Icon name="like" type="foundation" size={24} color={'black'} />
                {/* <FlatList
                    data={Object.values(props.profiles)}
                    renderItem={({ item }) => ( */}
                <ProfilePicture
                    style={styles.profilePicture}
                    initials={props.initials}
                ></ProfilePicture>
                {/* )}
                /> */}
            </View>
            <Box />
            <View style={styles.horizontal}>
                <Icon
                    name="dislike"
                    type="foundation"
                    size={24}
                    color={'black'}
                />
                <ProfilePicture
                    style={styles.profilePicture}
                    initials={props.initials}
                ></ProfilePicture>
            </View>
        </View>
    );
};
export default LikesList;
