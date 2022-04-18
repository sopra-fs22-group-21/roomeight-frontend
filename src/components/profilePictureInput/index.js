import { Text, View } from 'react-native';
import styles from './style';
import { Box } from '../theme';
import EditBadge from '../editBadge';

const profilePictureInput = (props) => (
    <Box>
        <View style={styles.background}>
            <Text style={styles.placeholder}>JK</Text>
        </View>
        <EditBadge />
    </Box>
);

export default profilePictureInput;
