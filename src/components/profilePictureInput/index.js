import { Pressable, Text, View, Image } from 'react-native';
import styles from './style';
import EditBadge from '../editBadge';

/**
 * Component to select an image from the device's gallery and display it.
 * Logic must be handled with onPress function.
 *
 * @param {string} props.variant 'profile' | 'additional'
 * @param {string} props.onPress 'onPress function'
 * @param {string} props.image 'image uri'
 * @required variant!
 */
const pictureInput = (props) => {
    switch (props.variant) {
        case 'profile':
            if (props.image) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={styles.imageProfile}
                            source={{ uri: props.image }}
                        />
                        <EditBadge variant={props.variant} set={true} />
                    </Pressable>
                );
            } else {
                return (
                    <Pressable onPress={props.onPressSelect}>
                        <View style={styles.backgroundProfile}>
                            <Text style={styles.placeholderProfile}>
                                {props.initials}
                            </Text>
                        </View>
                        <EditBadge set={false} />
                    </Pressable>
                );
            }
        case 'additional':
            if (props.image) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={styles.imageAdditional}
                            source={{ uri: props.image }}
                        />
                        <EditBadge variant={props.variant} set={true} />
                    </Pressable>
                );
            } else {
                return (
                    <Pressable onPress={props.onPressSelect}>
                        <View style={styles.backgroundAdditional}>
                            <Text style={styles.placeholderAdditional}>
                                {props.initials}
                            </Text>
                        </View>
                        <EditBadge variant={props.variant} set={false} />
                    </Pressable>
                );
            }
        default:
            return <Text> specify variant! </Text>;
    }
};

export default pictureInput;
