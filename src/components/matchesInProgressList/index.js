import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector } from 'react-redux';
import en from '../../resources/strings/en.json';
import LikesList from '../likesList';
import { ProfileInfoBox } from '../profiles';
import { EmptyCard } from '../publicProfileCard';
import { Box, NormalText, Title } from '../theme';
import styles from './styles';

const MatchesInProgressList = ({ navigation }, props) => {
    const { likes, loading } = useSelector((state) => state.likesState);
    const [modalVisible, setModalVisible] = useState(false);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [likesOfProfile, setLikesOfProfile] = useState(null);
    //if (loading) return <M8Loader/>;

    if (likes.length < 1)
        return (
            <>
                <Box />
                <NormalText>{en.matches.incompleteMatchesInfo}</NormalText>
                <EmptyCard textIfNoData={en.matches.noIncompleteMatches} />
            </>
        );

    return (
        <View>
            <Box />
            <Box>
                <NormalText>{en.matches.incompleteMatchesInfo}</NormalText>
            </Box>
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
                                    navigation.navigate('MatchInProgress', {
                                        profile: profile,
                                    });
                                }}
                                preMatch={() => {
                                    setModalVisible(true);
                                    setLikesOfProfile(profile);
                                }}
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
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Icon
                                style={styles.icon}
                                name="x"
                                type="feather"
                                size={24}
                                color={'black'}
                                onPress={() => setModalVisible(false)}
                            />
                            <View style={styles.modalInner}>
                                <Title>Likes Overview</Title>
                                <Box />
                                <LikesList
                                    flatprofile={flatprofile}
                                    userprofile={likesOfProfile}
                                />
                                <Box />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default MatchesInProgressList;
