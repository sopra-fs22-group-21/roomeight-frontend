import { Icon, ScrollView } from 'native-base';
import { React, useState } from 'react';
import { Box } from '../theme';
import styles from './style';
import { NativeBaseProvider, Center, HStack, Pressable } from 'native-base';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import { Container } from '../../components/theme';
import { useRoute } from '@react-navigation/native';

const NavBar = ({ navigation }) => {
    const route = useRoute().name;
    console.log(route);

    return (
        <NativeBaseProvider>
            <Container style={styles.container} />
            <Box
                style={styles.box}
                flex={1}
                bg="white"
                safeAreaTop
                width="100%"
                maxW="300px"
                alignSelf="center"
            >
                <Center flex={1}></Center>
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
