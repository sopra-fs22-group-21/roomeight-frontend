import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    day: {
        backgroundColor: '#e7e5e4',
        //height: 30,
        padding: 10,
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        borderRadius: 4,
        width: '22%',
    },
    month: {
        backgroundColor: '#e7e5e4',
        //height: 30,
        padding: 10,
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        borderRadius: 4,
        width: '22%',
    },
    year: {
        backgroundColor: '#e7e5e4',
        //height: 30,
        padding: 10,
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        borderRadius: 4,
        width: '50%',
    },
    error: {
        backgroundColor: '#fce6e6',
    },
    valid: {
        backgroundColor: '#e6f5ef',
    },
});

export default styles;
