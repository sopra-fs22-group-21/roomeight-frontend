import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    icon: {
        flex: 0,
        color: 'black',
        transform: [
            {
                translateY: -2,
            },
        ],
    },
    liked: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 15,
        paddingHorizontal: 5,
    },
});

export default styles;
