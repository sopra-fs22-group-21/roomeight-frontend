import { React, useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { NormalText, Strong } from '../theme';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';
import { ImageGallery } from '../imageGallery';

const SLIDER_WIDTH = Dimensions.get('window').width - 90;

const RoommateInfoBox = (props) => {
    const initials =
        props.roomie.firstName.substring(0, 1) +
        props.roomie.lastName.substring(0, 1);
    return (
        <Pressable
            style={styles.roomie}
            onPress={() => props.onPress(props.id)}
        >
            <View style={props.expanded ? styles.vertical : styles.horizontal}>
                <View style={styles.horizontal}>
                    {props.expanded ? (
                        <View style={styles.gallery}>
                            <ImageGallery
                                imageRefs={props.roomie.pictureReference}
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
                                props.roomie.pictureReference.length > 0
                                    ? props.roomie.pictureReference[0]
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
                    <Strong style={styles.roomieName}>
                        {props.roomie.firstName} {props.roomie.lastName}
                    </Strong>
                    {props.expanded ? (
                        <>
                            <NormalText style={styles.smaller}>
                                {props.roomie.biography}
                            </NormalText>
                            <NormalText style={styles.smaller}>
                                {props.roomie.description}
                            </NormalText>
                        </>
                    ) : null}
                </View>
            </View>
        </Pressable>
    );
};

export const Roommates = (props) => {
    const [expanded, setExpanded] = useState(null);
    console.log(expanded);
    return (
        <>
            {props.roomies.map((roomie) => (
                <RoommateInfoBox
                    roomie={roomie}
                    id={roomie.id}
                    key={roomie.id}
                    onPress={(id) => {
                        setExpanded(expanded != id ? id : null);
                    }}
                    expanded={expanded === roomie.id}
                />
            ))}
        </>
    );
};
