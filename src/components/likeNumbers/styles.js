import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column1: {
        paddingRight: 0,
        flex: 1,
        //flexShrink: 1,
    },
    column2: {
        paddingLeft: -20,
        paddingTop: 5,
        paddingRight: 10,
        flex: 1,
        transform: [
            {
                translateX: 20,
            },
        ],
    },
    icon: {
        flex: 0,
        color: colors.secondary400,
    },
    liked: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 15,
        paddingLeft: 3,
    },
});

export default styles;
