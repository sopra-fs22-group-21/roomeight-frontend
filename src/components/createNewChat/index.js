import {
    Actionsheet,
    Box,
    Center,
    FlatList,
    Heading,
    Text,
    useDisclose,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../redux/actions/chatActions';
import en from '../../resources/strings/en.json';
import { CreateNewChatButton } from '../button';
import { ProfileInfoBox } from '../profiles';

function filterExisting(chats, matches) {
    if(!matches){return []}
    else if (!chats) {
        return Object.values(matches);
    } else {
        let existing = [];
        Object.values(chats).forEach((chat) => {
            existing = [...existing, ...Object.keys(chat.members)];
        });
        console.log(existing)
        let filtered = Object.values(matches).filter((match) => {
            console.log(match.profileId)
            return !existing.includes(match.profileId);
        });
        if(!filtered.length){return [""]}
        return filtered;
    }
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
            return (
            <Center>
                <Heading paddingTop={"50%"}>{en.matches.noNewMatches}</Heading>
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
                                <Heading marginTop={"100%"}>
                                    {en.matches.noMatches}
                                </Heading>
                            )}
                            <Box w="100%" h="100%">
                                <FlatList
                                    data={filterExisting(chats, matches)}
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
