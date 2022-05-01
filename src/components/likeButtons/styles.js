import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    dislikeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 50,
        height: 50,
        backgroundColor: colors.primary200,
    },
    likeButton: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 100,
        width: 50,
        height: 50,
        backgroundColor: colors.secondary200,
    },
    icon: {
        //paddingLeft: 4,
    },
});

export default styles;
