import { useRoute } from '@react-navigation/native';
import {
    Center,
    HStack,
    Icon,
    NativeBaseProvider,
    Pressable,
} from 'native-base';
import { React } from 'react';
import { FontAwesome, Ionicons } from 'react-native-vector-icons';
import { Box, Container } from '../theme';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';

const NavBar = ({ navigation }) => {
    const route = useRoute().name;
    console.log(route);

    return (
        <NativeBaseProvider style={styles.container}>
            <Box
                style={styles.box}
                flex={1}
                bg="white"
                width="100%"
                alignSelf="center"
            >
                <HStack
                    bg="#0E7490"
                    alignItems="center"
                    safeAreaBottom
                    position="absolute"
                    bottom="0"
                >
                    <Pressable
                        //cursor="pointer"
                        opacity={route === 'Discover' ? 1 : 0.5}
                        py="2"
                        flex={1}
                        onPress={() => {
                            navigation.navigate('Discover');
                        }}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={<Ionicons name="ios-search" />}
                                color="white"
                                size="9"
                            />
                        </Center>
                    </Pressable>
                    <Pressable
                        //cursor="pointer"
                        opacity={route === 'Matches' ? 1 : 0.5}
                        py="3"
                        flex={1}
                        onPress={() => navigation.navigate('Matches')}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <Ionicons
                                        name={
                                            route === 'Matches'
                                                ? 'heart'
                                                : 'heart-outline'
                                        }
                                    />
                                }
                                color="white"
                                size="10"
                            />
                        </Center>
                    </Pressable>
                    <Pressable
                        //cursor="pointer"
                        opacity={route === 'Chat' ? 1 : 0.6}
                        py="2"
                        flex={1}
                        onPress={() => navigation.navigate('Chat')}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <Ionicons
                                        name={
                                            route === 'Chat'
                                                ? 'md-chatbubble'
                                                : 'md-chatbubble-outline'
                                        }
                                    />
                                }
                                color="white"
                                size="9"
                            />
                        </Center>
                    </Pressable>
                    <Pressable
                        //cursor="pointer"
                        opacity={route === 'Profile' ? 1 : 0.5}
                        py="2"
                        flex={1}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <FontAwesome
                                        name={
                                            route === 'Profile'
                                                ? 'user'
                                                : 'user-o'
                                        }
                                    />
                                }
                                color="white"
                                size="9"
                            />
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </NativeBaseProvider>
    );
};
export default NavBar;
