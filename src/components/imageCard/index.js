import { React } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import en from '../../resources/strings/en.json';
import { ImageGallery } from '../imageGallery';
import { NormalText, PinkBackground, Strong, Title } from '../theme';
import styles from './styles';

const ITEM_WIDTH = Dimensions.get('window').width - 80;
const MAX_LENGTH = 160;

export const ImageCard = (props) => {
    const croppedDescription =
        props.profile.description &&
        props.profile.description.length > MAX_LENGTH
            ? props.profile.description.substring(0, MAX_LENGTH) + '...'
            : props.profile.description;

    const initials = props.profile.firstName
        ? props.profile.firstName.charAt(0) + props.profile.lastName.charAt(0)
        : props.profile.name;
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
                    imageRefs={props.profile.pictureReferences}
                    onDoubleTap={props.onDoubleTap}
                    initials={initials}
                    height="100%"
                    itemWidth={ITEM_WIDTH}
                    sliderWidth={ITEM_WIDTH}
                    overlay={
                        props.profile.pictureReferences &&
                        props.profile.pictureReferences.length > 0
                    }
                />
                <View style={styles.row}>
                    <Pressable
                        style={styles.description}
                        onPress={props.onPress}
                    >
                        <Strong style={styles.text}>
                            {props.profile.description &&
                            props.profile.description.length > 0
                                ? en.discover.description
                                : 'View details'}
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
