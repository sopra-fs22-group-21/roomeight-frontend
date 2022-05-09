import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Profiles } from '../profiles';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';

const LikesList = (props) => {
    const flatprofile = props.flatprofile;
    console.log(props.roomMates);
    return (
        <View>
            <View style={styles.horizontal}>
                <Text>Liked:</Text>
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
            <View style={styles.horizontal}>
                <Text>Disliked:</Text>
                <ProfilePicture
                    style={styles.profilePicture}
                    initials={props.initials}
                ></ProfilePicture>
            </View>
            <View style={styles.horizontal}>
                <Text>Not seen:</Text>
                <ProfilePicture
                    style={styles.profilePicture}
                    initials={props.initials}
                ></ProfilePicture>
            </View>
        </View>
    );
};
export default LikesList;
