import { useNavigation } from '@react-navigation/native';
import { getDownloadURL } from 'firebase/storage';
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
import { getDownloadUrl } from '../../helper/imageHandler';

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();
    const { isSearching } = useSelector(
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
                            {isSearching
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
};

export default ChatListItem;
