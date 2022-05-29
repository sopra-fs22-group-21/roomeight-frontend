import colors from '../../resources/colors';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    button: {
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 18,
    },
    primary: {
        borderRadius: 20,
        backgroundColor: colors.primary700,
    },
    primaryPressed: {
        backgroundColor: colors.primary600,
    },
    primaryDisabled: {
        backgroundColor: colors.secondary200,
    },
    primaryLabel: {
        color: 'white',
    },
    secondary: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primary700,
        backgroundColor: 'white',
    },
    secondaryPressed: {
        backgroundColor: colors.secondary100,
    },
    secondaryLabel: {
        color: colors.primary700,
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 16,
    },
    secondaryPressedLabel: {},
    gender: {},
    genderDisabled: {},
    genderPressed: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    },
});

export default styles;
