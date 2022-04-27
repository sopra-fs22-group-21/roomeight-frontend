import { React, useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { NormalText, Strong } from '../theme';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';
import { ImageGallery } from '../imageGallery';

const SLIDER_WIDTH = Dimensions.get('window').width - 90;

export const ProfileInfoBox = (props) => {
    const initials = props.profile.firstName
        ? props.profile.firstName.substring(0, 1) +
          props.profile.lastName.substring(0, 1)
        : props.profile.name.substring(0, 1);
    return (
        <Pressable
            style={styles.profile}
            onPress={() => props.onPress(props.id)}
        >
            <View style={props.expanded ? styles.vertical : styles.horizontal}>
                <View style={styles.horizontal}>
                    {props.expanded &&
                    props.profile.pictureReferences &&
                    props.profile.pictureReferences[0].length > 1 ? (
                        <View style={styles.gallery}>
                            <ImageGallery
                                imageRefs={props.profile.pictureReferences}
                                itemWidth={150}
                                sliderWidth={SLIDER_WIDTH}
                                height={100}
                                activeSlideAlignment="start"
                                initials={initials}
                            />
                        </View>
                    ) : (
                        <ProfilePicture
                            image={
                                props.profile.pictureReferences &&
                                props.profile.pictureReferences.length > 0
                                    ? props.profile.pictureReferences[0]
                                    : null
                            }
                            initials={initials}
                            style={
                                props.expanded
                                    ? styles.expandedAvatar
                                    : styles.avatar
                            }
                            textStyle={styles.avatarText}
                        />
                    )}
                </View>
                <View style={styles.rightSide}>
                    <Strong style={styles.name}>
                        {props.profile.firstName
                            ? props.profile.firstName +
                              ' ' +
                              props.profile.lastName
                            : props.profile.name}
                    </Strong>
                    {props.expanded ? (
                        <>
                            <NormalText style={styles.smaller}>
                                {props.profile.biography}
                            </NormalText>
                            <NormalText style={styles.smaller}>
                                {props.profile.description}
                            </NormalText>
                        </>
                    ) : null}
                </View>
            </View>
        </Pressable>
    );
};

export const Profiles = (props) => {
    const [expanded, setExpanded] = useState(null);
    console.log(expanded);
    return (
        <>
            {props.profiles.map((profile) => (
                <ProfileInfoBox
                    profile={profile}
                    id={profile.profileId}
                    key={profile.profileId}
                    onPress={(id) => {
                        setExpanded(expanded != id ? id : null);
                    }}
                    expanded={expanded === profile.profileId}
                />
            ))}
        </>
    );
};
