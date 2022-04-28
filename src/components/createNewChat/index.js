import {
    Actionsheet,
    Box,
    Center,
    FlatList,
    Heading,
    useDisclose,
    Text,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../redux/actions/chatActions';
import { CreateNewChatButton } from '../button';
import { ProfileInfoBox } from '../profiles';
import en from '../../resources/strings/en.json';

function filterExisting(chats, matches) {
    let existing = [];
    Object.values(chats).forEach((chat) => {
        existing = [...existing, ...Object.keys(chat.members)];
    });
    let filtered = Object.values(matches).filter((match) => {
        return !existing.includes(match.profileId);
    });
    return filtered;
}

const CreateNewChat = (props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const { isSearching } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    const { chats } = useSelector((state) => state.chatState);
    const dispatch = useDispatch();

    let matches;
    if (isSearching) {
        matches = useSelector(
            (state) => state.userprofileState.userprofile.matches
        );
    } else {
        matches = useSelector(
            (state) => state.flatprofileState.flatprofile.matches
        );
    }

    const renderItem = ({ item }) => {
        if (!item) {
            return <Text>{en.matches.noNewMatches}</Text>;
        }

        return (
            <ProfileInfoBox
                profile={item}
                id={item.profileId}
                onPress={(id) => {
                    dispatch(createChat(id));
                }}
            />
        );
    };

    return (
        <Box>
            <CreateNewChatButton onPress={onOpen}>hello</CreateNewChatButton>
            <Center>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Heading>{en.matches.heading}</Heading>
                        <Center w="100%" h="100%">
                            {!matches && (
                                <Heading marginTop={500}>
                                    {en.matches.noMatches}
                                </Heading>
                            )}
                            <Box w="100%" h="100%">
                                <FlatList
                                    data={
                                        matches
                                            ? filterExisting(chats, matches)
                                            : []
                                    }
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

export default CreateNewChat;
