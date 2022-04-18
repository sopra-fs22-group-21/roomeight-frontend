import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    column: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
});

export default styles;
