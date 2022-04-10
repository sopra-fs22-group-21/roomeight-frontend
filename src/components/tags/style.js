import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    tagElement: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        padding: 3,
    },
    text: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 13,
        lineHeight: 25,
        paddingLeft: 5,
    },
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
