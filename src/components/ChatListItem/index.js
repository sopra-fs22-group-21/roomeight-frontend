import { Pressable, View } from 'react-native';
import { Avatar } from 'react-native-elements';

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate('chatSingle')}>
            <Avatar source="https://picsum.photos/200/300" />
            <View>
                <Text>{chat.name}</Text>
                <Text>{chat.lastMessage}</Text>
            </View>
        </Pressable>
    );
};

export default ChatListItem;
