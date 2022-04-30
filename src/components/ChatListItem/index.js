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
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();
    const { isSearchingRoom } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    return (
        <Pressable
            onPress={() => navigation.navigate('ChatRoom', { chatInfo: chat })}
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
                            {isSearchingRoom
                                ? chat.title.forUser
                                : chat.title.forFlat}
                        </Text>
                        {chat.lastSender && (
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200',
                                }}
                            >
                                {chat.lastSender}
                            </Text>
                        )}
                        <Text
                            color="coolGray.600"
                            _dark={{
                                color: 'warmGray.200',
                            }}
                        >
                            {chat.lastMessage}
                        </Text>
                    </VStack>
                    <Text
                        marginLeft={'-10%'}
                        fontSize="xs"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start"
                    >
                        {dateFormat(chat.timestamp, 'dd.mm, hh:MM')}
                    </Text>
                </HStack>
            </Box>
        </Pressable>
    );
};

export default ChatListItem;
