import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../../components/profiles';
import { Box, Title } from '../../../../components/theme';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { Text, View, Modal, Pressable } from 'react-native';
import { SecondaryButton } from '../../../../components/button';
import styles from './styles';
import LikesList from '../../../../components/likesList';

const LikesFlat = ({ navigation }, props) => {
    const { likes, loading } = useSelector((state) => state.likesState);
    const [modalVisible, setModalVisible] = useState(false);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [likesOfProfile, setLikesOfProfile] = useState(null);
    if (loading) return <Text>loading</Text>;
    else {
        console.log('\n\n\n\nlikes:');
        console.log(likes);
    }
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
        <View>
            <Box />
            {likes
                .map((like) => like.likedUser)
                .map((like) => Object.values(like)[0])
                .map((profile, index) => {
                    if (profile.profileId)
                        return (
                            <ProfileInfoBox
                                navigation={navigation}
                                profile={profile}
                                id={profile.profileId}
                                key={index}
                                onPress={(id) => {
                                    navigation.navigate('Match', {
                                        profile: profile,
                                    });
                                }}
                                onClickShowLikes={() => {
                                    setModalVisible(true);
                                    setLikesOfProfile(profile);
                                }}
                                nrLiked={countLikes(profile.profileId)}
                                nrRoommates={
                                    flatprofile.roomMates
                                        ? Object.keys(flatprofile.roomMates)
                                              .length
                                        : null
                                }
                            />
                        );
                })}

            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Title>Likes Overview</Title>
                            <Box />
                            <LikesList
                                flatprofile={flatprofile}
                                userprofile={likesOfProfile}
                            />
                            <Box />
                            <SecondaryButton
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                Hide Overview
                            </SecondaryButton>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default LikesFlat;
