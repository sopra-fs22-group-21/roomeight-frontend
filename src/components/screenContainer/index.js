import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import colors from '../../resources/colors';
import { PrimaryButton } from '../button';
import NavBar from '../navbar';
import { NavigationButtons } from '../navigationButtons';
import { Box } from '../theme';
import styles from './styles';

export const ScreenContainer = (props) => {
    const dispatch = useDispatch();
    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top']}
                style={{ height: 0, backgroundColor: 'white' }}
            />
            <SafeAreaView
                edges={['left', 'right', 'bottom']}
                style={{
                    flex: 2,
                    backgroundColor: props.showNavBar
                        ? colors.primary700
                        : 'white',
                }}
            >
                <View
                    {...props}
                    style={{ ...styles.container, ...props.style }}
                >
                    {props.children}
                    {props.showLogout ? (
                        <Box>
                            <PrimaryButton
                                onPress={() => dispatch(logoutUser())}
                            >
                                Logout
                            </PrimaryButton>
                        </Box>
                    ) : null}
                </View>

                {props.onPressBack || props.onPressNext ? (
                    <View style={styles.navigationButtons}>
                        <NavigationButtons
                            onPressBack={props.onPressBack}
                            onPressNext={props.onPressNext}
                            nextDisabled={props.nextDisabled}
                        />
                    </View>
                ) : null}
                {props.showNavBar ? (
                    <NavBar navigation={props.navigation} />
                ) : null}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
