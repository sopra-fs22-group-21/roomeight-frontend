import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        marginTop: 20,
        paddingTop: 0,
        marginBottom: 60,
        height: '100%',
    },
    text: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 16,
        lineHeight: 24,
    },
    tab: {
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
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
});
export default styles;
