import { Icon, ScrollView } from 'native-base';
import { React, useState } from 'react';
import { Box } from '../theme';
import styles from './style';
import { NativeBaseProvider, Center, HStack, Pressable } from 'native-base';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import { Container } from '../../components/theme';

const NavBar = (props, { navigation }) => {
    const [selected, setSelected] = useState(1);
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
                >
                    <Pressable
                        //cursor="pointer"
                        opacity={selected === 1 ? 1 : 0.5}
                        py="2"
                        flex={1}
                        onPress={() => {
                            setSelected(1);
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
                        opacity={selected === 0 ? 1 : 0.5}
                        py="3"
                        flex={1}
                        onPress={() => setSelected(0)}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <Ionicons
                                        name={
                                            selected === 0
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
                        opacity={selected === 2 ? 1 : 0.6}
                        py="2"
                        flex={1}
                        onPress={() => setSelected(2)}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <Ionicons
                                        name={
                                            selected === 2
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
                        opacity={selected === 3 ? 1 : 0.5}
                        py="2"
                        flex={1}
                        onPress={() => setSelected(3)}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <FontAwesome
                                        name={
                                            selected === 3 ? 'user' : 'user-o'
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
