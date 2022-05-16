import {
    Actionsheet,
    Box,
    Center,
    FlatList,
    Heading,
    useDisclose,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../redux/actions/chatActions';
import en from '../../resources/strings/en.json';
import { CreateNewChatButton } from '../button';
import { ProfileInfoBox } from '../profiles';

function filterExisting(chats, matches) {
    if (!matches) {
        return [];
    } else if (!chats) {
        return Object.values(matches);
    } else {
        let existing = [];
        Object.values(chats).forEach((chat) => {
            existing.push(chat.userId);
            existing.push(chat.flatId);
        });
        let filtered = Object.values(matches).filter((match) => {
            return !existing.includes(match.profileId);
        });
        if (!filtered.length) {
            return [''];
        }
        return filtered;
    }
}

const CreateNewChat = (_props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const { isSearchingRoom } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    const { chats } = useSelector((state) => state.chatState);
    const dispatch = useDispatch();

    const { matches } = useSelector((state) => state.matchesState);

    const renderItem = ({ item }) => {
        if (!item) {
            return (
                <Center>
                    <Heading paddingTop={'50%'}>
                        {en.matches.noNewMatches}
                    </Heading>
                </Center>
            );
        }

        return (
            <ProfileInfoBox
                profile={item}
                id={item.profileId}
                onPress={(id) => {
                    dispatch(createChat(id));
                    onClose();
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
                                <Heading marginTop={'100%'}>
                                    {en.matches.noMatches}
                                </Heading>
                            )}
                            <Box w="100%" h="100%">
                                <FlatList
                                    data={filterExisting(chats, matches)}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.profileId}
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
