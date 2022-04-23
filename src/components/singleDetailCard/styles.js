import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column: {
        width: '50%',
    },
    column1: {
        paddingRight: 10,
    },
    column2: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    text: {
        fontSize: 14,
        paddingBottom: 4,
    },
    image: {
        borderRadius: 20,
        aspectRatio: 1,
        width: '100%',
        borderColor: 'transparent',
    },
    tags: {
        paddingLeft: 0,
    },
});

export default styles;
