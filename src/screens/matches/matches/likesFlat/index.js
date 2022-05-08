import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../../components/profiles';
import { ScreenContainer } from '../../../../components/screenContainer';
import { Box, Title } from '../../../../components/theme';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { Text, View, Modal, Pressable } from 'react-native';
import { SecondaryButton } from '../../../../components/button';
import styles from './styles';
import LikesList from '../../../../components/likesList';

const LikesFlat = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Box />
            {Object.values(matches).map((profile, index) => {
                console.log('like: ' + profile.profileId);
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
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Title>Likes Overview</Title>
                            <LikesList />
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
