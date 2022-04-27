import { React } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { Box, NormalText, PinkBackground, Strong, Title } from '../theme';
import { ProfilePicture } from '../profilePicture';
import en from '../../resources/strings/en.json';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageGallery } from '../imageGallery';
import { Icon } from 'react-native-elements';

const ITEM_WIDTH = Dimensions.get('window').width - 80;
const MAX_LENGTH = 160;

export const ImageCard = (props) => {
    const croppedDescription =
        props.profile.description &&
        props.profile.description.length > MAX_LENGTH
            ? props.profile.description.substring(0, MAX_LENGTH) + '...'
            : props.profile.description;
    return (
        <PinkBackground style={styles.pink}>
            <TouchableWithoutFeedback
                style={styles.name}
                onPress={props.onPress}
            >
                <Title>
                    {props.profile.firstName
                        ? props.profile.firstName
                        : props.profile.name}
                </Title>
            </TouchableWithoutFeedback>
            <View style={styles.swiper}>
                <ImageGallery
                    imageRefs={props.profile.pictureReference}
                    onDoubleTap={props.onDoubleTap}
                    height="100%"
                    itemWidth={ITEM_WIDTH}
                    sliderWidth={ITEM_WIDTH}
                    overlay={true}
                />
                <View style={styles.row}>
                    <Pressable
                        style={styles.description}
                        onPress={props.onPress}
                    >
                        <Strong style={styles.text}>
                            {en.discover.description}
                        </Strong>
                        <NormalText
                            style={{ ...styles.text, ...styles.smaller }}
                        >
                            {croppedDescription}
                        </NormalText>
                    </Pressable>
                    {props.onClickMessage ? (
                        <Icon
                            style={styles.messageIcon}
                            name="chat-plus"
                            size={30}
                            type="material-community"
                            color={'white'}
                            onPress={props.onClickMessage}
                        />
                    ) : null}
                </View>
            </View>
        </PinkBackground>
    );
};
