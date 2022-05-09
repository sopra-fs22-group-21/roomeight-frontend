import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 20,
        paddingTop: 0,
        justifyContent: 'flex-end',
    },
    inner: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
    },
    filter: {
        backgroundColor: colors.primary100, //'#e7e5e4',
        borderRadius: 20,
        padding: 3,
        paddingLeft: 10,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 5,
    },
    filterLabel: {
        paddingRight: 5,
        fontSize: 15,
    },
});

export default styles;
