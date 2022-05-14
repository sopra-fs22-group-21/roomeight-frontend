import React, { useEffect } from 'react';
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

    const roomiesLikedList = Object.values(
        flatprofile.likes.filter(
            (like) => Object.keys(like.likedUser)[0] === userprofile.profileId
        )[0].likes
    );

    console.log('Roomies Liked:', roomiesLikedList);

    /*  const roomiesLikedObj = Object.values(flatprofile.roomMates).map(
        (roomie) => roomie.profileId === roomiesLikedList[0]
    ); */

    /*  Object.values(flatprofile.roomMates).filter(
        (roomie) => roomie.profileId === roomiesLikedList[0]
    );
 */

    function getRoomiesLiked() {
        const roomiesLikedObj = [];
        for (let i = 0; i < Object.keys(flatprofile.roomMates).length; i++) {
            if (
                roomiesLikedList.includes(
                    Object.values(flatprofile.roomMates)[i].profileId
                )
            ) {
                roomiesLikedObj.push(Object.values(flatprofile.roomMates)[i]);
                console.log('RoomiesOBJECT:', roomiesLikedObj);
            }
        }
        console.log('RoomiesObj:', roomiesLikedObj);
        return roomiesLikedObj;
    }

    function getRoomiesDisliked() {
        const roomiesDislikedObj = [];
        for (let i = 0; i < Object.keys(flatprofile.roomMates).length; i++) {
            if (
                !roomiesLikedList.includes(
                    Object.values(flatprofile.roomMates)[i].profileId
                )
            ) {
                roomiesDislikedObj.push(
                    Object.values(flatprofile.roomMates)[i]
                );
            }
        }
        console.log('RoomiesDislikeObj:', roomiesDislikedObj);
        return roomiesDislikedObj;
    }

    console.log('Roomies:', roomiesLikedList);

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
                    data={getRoomiesLiked()}
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
                    <FlatList
                        numColumns={5}
                        data={getRoomiesDisliked()}
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
                </Pressable>
            </View>
        </View>
    );
};
export default LikesList;
