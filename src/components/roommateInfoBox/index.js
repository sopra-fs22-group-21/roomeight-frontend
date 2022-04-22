import { React, useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { NormalText, Strong } from '../theme';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';
import { ImageGallery } from '../imageGallery';

const SLIDER_WIDTH = Dimensions.get('window').width - 90;

export const RoommateInfoBox = (props) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Pressable style={styles.roomie} onPress={() => setExpanded(!expanded)}>
            <View style={expanded ? styles.vertical : styles.horizontal}>
                <View style={styles.horizontal}>
                    {expanded ? (
                        <View style={styles.gallery}>
                            <ImageGallery
                                imageRefs={props.roomie.pictureReference}
                                itemWidth={150}
                                sliderWidth={SLIDER_WIDTH}
                                height={100}
                                activeSlideAlignment="start"
                            />
                        </View>
                    ) : (
                        <ProfilePicture
                            image={
                                props.roomie.pictureReference.length > 0
                                    ? props.roomie.pictureReference[0]
                                    : null
                            }
                            initials={
                                props.roomie.firstName.substring(0, 1) +
                                props.roomie.lastName.substring(0, 1)
                            }
                            style={
                                expanded ? styles.expandedAvatar : styles.avatar
                            }
                            textStyle={styles.avatarText}
                        />
                    )}
                </View>
                <View style={styles.rightSide}>
                    <Strong style={styles.roomieName}>
                        {props.roomie.firstName} {props.roomie.lastName}
                    </Strong>
                    {expanded ? (
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
