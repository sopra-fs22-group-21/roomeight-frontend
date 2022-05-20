import React from 'react';
import { Dimensions, Pressable, View, Text } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import HeartCutOut from '../../../assets/heartCutOut';
import { SecondaryButton } from '../button';
import { ProfilePicture } from '../profilePicture';
import { Box, Heading, NormalText, Strong } from '../theme';
import en from '../../resources/strings/en.json';
import styles from './styles';

export const ItsAMatch = ({ profile, onDiscard, navigation, isComplete }) => {
    const heading = isComplete
        ? en.matches.itsAMatch
        : profile.firstName + en.matches.itsAnIncompleteMatch;
    const info = isComplete ? en.matches.info : en.matches.incompleteInfo;

    const handlePress = () => {
        if (isComplete) navigation.navigate('Match', { profile: profile });
        else navigation.navigate('IncompleteMatch', { profile: profile });
    };

    return (
        <>
            <View style={styles.container} onPress={onDiscard}>
                <View style={styles.inner}>
                    <ProfilePicture
                        image={
                            profile.pictureReferences
                                ? profile.pictureReferences[0]
                                : null
                        }
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
                        <Heading style={styles.heading}>{heading}</Heading>
                        <NormalText style={styles.text}>{info}</NormalText>
                        <Pressable
                            style={styles.pressable}
                            onPress={handlePress}
                        />
                        {isComplete ? (
                            <SecondaryButton
                                style={styles.button}
                                onPress={() =>
                                    dispatch(
                                        goToChat(profile.profileId, navigation)
                                    )
                                }
                            >
                                Message
                                {' ' + profile.firstName
                                    ? profile.firstName
                                    : profile.name}
                            </SecondaryButton>
                        ) : null}
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
};
