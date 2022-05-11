import React from 'react';
import { Dimensions, Pressable, View, Text } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import HeartCutOut from '../../../assets/heartCutOut';
import { SecondaryButton } from '../button';
import { ProfilePicture } from '../profilePicture';
import { Box, Heading, Strong } from '../theme';
import styles from './styles';

export const ItsAMatch = ({
    profile,
    onDiscard,
    navigation,
    onPressMessage,
}) => (
    <>
        <View style={styles.container} onPress={onDiscard}>
            <View style={styles.inner}>
                <ProfilePicture
                    image={profile.pictureReferences[0]}
                    style={styles.image}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <HeartCutOut stlye={styles.heartOverlay} />
                    <Heading style={styles.heading}>It's a match!</Heading>
                    <Pressable
                        style={styles.pressable}
                        onPress={() =>
                            navigation.navigate('Match', { profile: profile })
                        }
                    />
                    <SecondaryButton
                        style={styles.button}
                        onPress={onPressMessage}
                    >
                        Message{' '}
                        {profile.firstName ? profile.firstName : profile.name}
                    </SecondaryButton>
                    <Pressable onPress={onDiscard} style={styles.close}>
                        <Icon
                            name="close"
                            type="material"
                            size={30}
                            color="black"
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    </>
);
