import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        maxHeight: 150,
    },
    column: {
        width: '50%',
        paddingRight: 10,
    },
    text: {
        fontSize: 14,
        paddingBottom: 4,
    },
    image: {
        borderRadius: 20,
        aspectRatio: null,
        minHeight: 100,
        maxHeight: '100%',
        width: '100%',
        borderColor: 'transparent',
    },
    tags: {
        paddingLeft: 0,
    },
});

export default styles;
