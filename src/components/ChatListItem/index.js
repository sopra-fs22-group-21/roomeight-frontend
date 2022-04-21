import { useNavigation } from '@react-navigation/native';
import {
    Avatar,
    Box,
    HStack,
    Pressable,
    Spacer,
    Text,
    VStack,
} from 'native-base';
import { View } from 'react-native';

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('ChatRoom', { chatId: chat._id })
            }
        >
            <Box
                borderBottomWidth="1"
                _dark={{
                    borderColor: 'muted.50',
                }}
                borderColor="muted.800"
                pl="4"
                pr="5"
                py="2"
            >
                <HStack space={3} justifyContent="space-between">
                    <Avatar
                        size="48px"
                        source={{
                            uri: 'https://picsum.photos/200/300',
                        }}
                    />
                    <VStack>
                        <Text
                            _dark={{
                                color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold
                        >
                            {chat.title}
                        </Text>
                        <Text
                            color="coolGray.600"
                            _dark={{
                                color: 'warmGray.200',
                            }}
                        >
                            {chat.lastSender}
                        </Text>
                        <Text
                            color="coolGray.600"
                            _dark={{
                                color: 'warmGray.200',
                            }}
                        >
                            {chat.lastMessage}
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text
                        fontSize="xs"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start"
                    >
                        {chat.timeStamp}
                    </Text>
                </HStack>
            </Box>
        </Pressable>
    );

    return (
        <Pressable onPress={() => navigation.navigate('chatSingle')}>
            <Avatar source={{ uri: 'https://picsum.photos/200/300' }} />

            <View>
                <Text>{chat.title}</Text>
                <Text>{chat.lastMessage}</Text>
            </View>
        </Pressable>
    );
};

export default ChatListItem;
