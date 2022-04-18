import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './style';
import editIcons from '../../resources/icons/editIcons';

const editBadge = (props) => (
    <View style={styles.background}>
        <Icon
            style={styles.icon}
            name={editIcons.add.name}
            type={editIcons.add.type}
            size={20}
            color={'black'}
        />
    </View>
);

export default editBadge;
