import { StyleSheet } from 'react-native';
import { ITEM_WIDTH, SLIDER_WIDTH } from '.';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        borderRadius: 20,
        width: ITEM_WIDTH,
        height: '100%',
    },
    gradientContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        height: '30%',
        width: '100%',
        borderRadius: 20,
    },
});

export default styles;
