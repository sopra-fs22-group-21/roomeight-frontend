import { StyleSheet } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
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
        backgroundColor: colors.brightRed,
        borderWidth: 2.5,
        borderColor: colors.red,
        color: colors.red,
        //borderWidth: 1,
    },
    likeButton: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 100,
        width: 50,
        height: 50,
        //backgroundColor: '#f0f0f0',
        borderWidth: 2.5,
        backgroundColor: colors.brightRed,
        borderColor: colors.red,
        color: colors.red,
    },
    icon: {
        //paddingLeft: 4,
    },
});

export default styles;
