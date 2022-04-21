import {
    Actionsheet,
    Box,
    Button,
    Center,
    FlatList,
    Heading,
    Pressable,
    Spacer,
    Text,
    useDisclose,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../redux/actions/chatActions';
import { CreateNewChatButton } from '../button';

const NewChat = (props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const { matches } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    const dispatch = useDispatch();

    const renderItem = ({ item }) => {
        return (
            <Center>
                <Pressable
                    onPress={() => {
                        dispatch(createChat(item));
                    }}
                    borderRadius="md"
                    height={50}
                    width={300}
                    my={1}
                    backgroundColor="red.100"
                    alignItems="center"
                >
                    <Center height={50} width={300}>
                        <Text>{item}</Text>
                    </Center>
                </Pressable>
            </Center>
        );
    };

    return (
        <Box>
            <CreateNewChatButton onPress={onOpen}>hello</CreateNewChatButton>
            <Center>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Heading>Matches</Heading>
                        <Center w="100%" h="100%">
                            <Box w="100%" h="100%">
                                <FlatList
                                    data={matches}
                                    renderItem={renderItem}
                                    keyExtractor={(index) => index}
                                />
                            </Box>
                        </Center>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        </Box>
    );
};

export default NewChat;
