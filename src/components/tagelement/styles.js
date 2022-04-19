import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    tagElement: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
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
    selected: {
        color: '#0E7490',
    },
});

export default styles;
