import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ProfilePicture } from '../profilePicture';
import { Box } from '../theme';
import styles from './styles';

const LikesList = (props) => {
    const flatprofile = props.flatprofile;
    const userprofile = props.userprofile;

    const roomiesLikedList = Object.values(
        flatprofile.likes.filter(
            (like) => Object.keys(like.likedUser)[0] === userprofile.profileId
        )[0].likes
    );

    function getRoomiesLiked() {
        const roomiesLikedObj = [];
        for (let i = 0; i < Object.keys(flatprofile.roomMates).length; i++) {
            if (
                roomiesLikedList.includes(
                    Object.values(flatprofile.roomMates)[i].profileId
                )
            ) {
                roomiesLikedObj.push(Object.values(flatprofile.roomMates)[i]);
            }
        }
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
        return roomiesDislikedObj;
    }

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
                    keyExtractor={(roomie) => roomie.profileId}
                    renderItem={({ item }) => {
                        return item ? (
                            <ProfilePicture
                                style={styles.profilePicture}
                                image={item.pictureReferences[0]}
                                initials={
                                    item.firstName.charAt(0).toUpperCase() +
                                    item.lastName.charAt(0).toUpperCase()
                                }
                                textStyle={{ fontSize: 20, padding: 0 }}
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
                        keyExtractor={(roomie) => roomie.profileId}
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
