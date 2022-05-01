import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';

const styles = StyleSheet.create({
    overview: {
        backgroundColor: colors.secondary100,
        padding: 5,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        height: 100,
    },

    text: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 16,
        lineHeight: 24,
    },
    tab: {
        bottom: 1,
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
    },
    indicator: {
        backgroundColor: colors.primary600,
        height: 3,
    },
    container: {
        flex: 1,
        padding: 0,
        marginTop: 20,
        paddingTop: 0,
        marginBottom: 60,
        height: '100%',
    },
    inner: {
        flex: 1,
    },
    box: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 2,
        height: '100%',
    },
    choice: {
        backgroundColor: 'white',
        borderColor: 'white',
        height: '100%',
        width: '50%',
    },
    image: {
        borderRadius: 100,
        height: 90,
        width: 90,
        borderColor: 'transparent',
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingRight: 5,
    },
    name: {
        fontFamily: 'SourceSans3Bold',
        fontSize: 20,
        lineHeight: 28,
        alignSelf: 'center',
    },
});
export default styles;
