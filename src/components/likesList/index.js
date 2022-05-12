import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Profiles } from '../profiles';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';
import { Box } from '../theme';

const LikesList = (props) => {
    const flatprofile = props.flatprofile;
    const userprofile = props.userprofile;
    console.log('FLAAAAAAAAAAAAAAAAAAAATPROFILE');

    const roomiesLiked = Object.values(
        flatprofile.likes.filter(
            (like) => Object.keys(like.likedUser)[0] === userprofile.profileId
        )[0].likes
    );

    console.log('Roomies Liked:', roomiesLiked);

    const roomie = Object.values(flatprofile.roomMates).filter(
        (roomie) => roomie.profileId === roomiesLiked[0]
    );
    /* console.log('user:');
    console.log(userprofile); */
    return (
        <View>
            <View style={styles.horizontal}>
                <Icon
                    style={styles.icon}
                    name="like"
                    type="foundation"
                    size={24}
                    color={'black'}
                />
                <FlatList
                    numColumns={5}
                    data={roomie}
                    keyExtractor={(item) => {
                        item;
                        console.log('\nITEM:');
                        console.log(item);
                    }}
                    renderItem={({ item }) => {
                        return item ? (
                            <ProfilePicture
                                style={styles.profilePicture}
                                image={item.pictureReferences[0]}
                            ></ProfilePicture>
                        ) : null;
                    }}
                />
            </View>
            <Box />
            <View>
                <Pressable style={styles.horizontal}>
                    <Icon
                        style={styles.icon}
                        name="dislike"
                        type="foundation"
                        size={24}
                        color={'black'}
                    />
                    <ProfilePicture
                        style={styles.profilePicture}
                        initials={props.initials}
                    ></ProfilePicture>
                </Pressable>
            </View>
        </View>
    );
};
export default LikesList;
