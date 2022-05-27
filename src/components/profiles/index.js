import { React, useState } from 'react';
import { Dimensions, FlatList, Pressable, View } from 'react-native';
import { ImageGallery } from '../imageGallery';
import LikeNumbers from '../likeNumbers';
import { ProfilePicture } from '../profilePicture';
import { NormalText, Strong } from '../theme';
import styles from './styles';

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
                    props.profile.pictureReferences[0] ? (
                        <View style={styles.gallery}>
                            <ImageGallery
                                imageRefs={props.profile.pictureReferences}
                                itemWidth={150}
                                sliderWidth={SLIDER_WIDTH}
                                height={100}
                                activeSlideAlignment="start"
                                textStyle={
                                    props.expanded ? null : styles.avatarText
                                }
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
                            textStyle={
                                props.expanded ? null : styles.avatarText
                            }
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
                {props.preMatch ? (
                    <View>
                        <Pressable style={styles.row} onPress={props.preMatch}>
                            <LikeNumbers
                                style={styles.icon}
                                userprofile={props.profile}
                            ></LikeNumbers>
                        </Pressable>
                    </View>
                ) : null}
            </View>
        </Pressable>
    );
};

export const Profiles = (props) => {
    if (!props.profiles || Array.isArray(props.profiles)) return null;

    const [expanded, setExpanded] = useState(null);
    return (
        <FlatList
            data={Object.values(props.profiles)}
            renderItem={({ item }) => (
                <ProfileInfoBox
                    profile={item}
                    id={item.profileId}
                    key={item.profileId}
                    onPress={(id) => {
                        setExpanded(expanded != id ? id : null);
                    }}
                    expanded={expanded === item.profileId}
                />
            )}
            keyExtractor={(item) => item.profileId}
            style={props.style}
        />
    );
};
