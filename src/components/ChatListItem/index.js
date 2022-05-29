import { useNavigation } from '@react-navigation/native';
import dateFormat from 'dateformat';
import { Avatar, Box, HStack, Pressable, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getImageSource } from '../../helper/imageHandler';

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();
    const { isSearchingRoom } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    const { matches } = useSelector((state) => state.matchesState);
    let pic;
    const [imageSource, setImageSource] = useState({ uri: '' });
    useEffect(() => {
        if (isSearchingRoom) {
            pic = matches[chat.flatId].pictureReferences[0];
        } else {
            pic = matches[chat.userId].pictureReferences[0];
        }
        async function loadSource() {
            const source = await getImageSource(pic);
            setImageSource(source);
        }
        loadSource();
    }, [chat]);
    return (
        <Pressable
            onPress={() =>
                navigation.navigate('Chatroom', { chatId: chat._id })
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
                <HStack space={3} justifyContent="flex-start">
                    <Avatar
                        size="48px"
                        source={{
                            uri: imageSource.uri,
                        }}
                    />
                    <VStack justifyContent="flex-start">
                        <Text
                            _dark={{
                                color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold
                        >
                            {isSearchingRoom
                                ? chat.title.forUser
                                : chat.title.forFlat}
                        </Text>
                        {chat.lastSender ? (
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200',
                                }}
                            >
                                {chat.lastSender +
                                    ': ' +
                                    chat.lastMessage?.substring(0, 20)}
                            </Text>
                        ) : (
                            <Text color="coolGray.600">
                                {chat.lastMessage?.substring(0, 20)}
                            </Text>
                        )}
                    </VStack>
                    <Text
                        marginLeft="auto"
                        fontSize="xs"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start"
                    >
                        {dateFormat(chat.timestamp, 'dd.mm, HH:MM')}
                    </Text>
                </HStack>
            </Box>
        </Pressable>
    );
};

export default ChatListItem;
