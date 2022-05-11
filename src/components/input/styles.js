import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#e7e5e4',
        //height: 30,
        padding: 10,
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        borderRadius: 4,
    },
    error: {
        backgroundColor: '#f2e9ec',
    },
    valid: {
        backgroundColor: '#e9f2ef',
    },
    text: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 16,
        lineHeight: 24,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    choice: {
        backgroundColor: 'white',
        borderColor: 'white',
        padding: 0,
        margin: 0,
        paddingTop: 5,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
    },
});

export default styles;
