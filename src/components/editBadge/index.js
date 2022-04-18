import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './style';
import editIcons from '../../resources/icons/editIcons';

const editBadge = (props) => (
    <View style={styles.background}>
        {props.set ? (
            <Icon
                style={styles.icon}
                name={editIcons.delete.name}
                type={editIcons.delete.type}
                size={20}
                color={'black'}
            />
        ) : (
            <Icon
                style={styles.icon}
                name={editIcons.add.name}
                type={editIcons.add.type}
                size={20}
                color={'black'}
            />
        )}
    </View>
);

export default editBadge;
