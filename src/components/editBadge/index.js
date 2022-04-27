import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import editIcons from '../../resources/icons/editIcons';
import styles from './styles';

const editBadge = (props) => {
    if (!props.variant) return <Text>specify variant</Text>;
    const backgroundStyle = () => {
        switch (props.variant) {
            case 'profile':
                return styles.backgroundProfile;
            case 'additional':
                return styles.backgroundAdditional;
            case 'editprofile':
            default:
                return styles.backgroundEdit;
        }
    };
    return (
        <View style={backgroundStyle()}>
            {props.set ? (
                <Icon
                    style={styles.icon}
                    name={editIcons.delete.name}
                    type={editIcons.delete.type}
                    size={props.variant == 'editprofile' ? 25 : 20}
                    color={'black'}
                />
            ) : (
                <Icon
                    style={styles.icon}
                    name={editIcons.add.name}
                    type={editIcons.add.type}
                    size={props.variant == 'editprofile' ? 25 : 20}
                    color={'black'}
                />
            )}
        </View>
    );
};

export default editBadge;
