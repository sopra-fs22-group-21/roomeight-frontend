import Profile from '../../screens/profile';
import Chat from '../../screens/chat';
import Chatroom from '../../screens/chatRoom';
import Discover from '../../screens/discover/discover';
import Match from '../../screens/matches/match';
import Matches from '../../screens/matches/matches';
import Profile from '../../screens/profile';
import Settings from '../../screens/profile/settings';
import LikesFlat from '../../screens/matches/matches/likesFlat';
import MatchesFlat from '../../screens/matches/matches/matchesFlat';
import { createFlatScreens } from '../incompleteScreens';
import Done from '../../screens/create-profile/done';

const options = {
    headerShown: false,
    gestureEnabled: false,
    cardStyleInterpolator: ({ current: { progress } }) => {
        return {
            cardStyle: {
                opacity: progress,
            },
        };
    },
};
const homeScreens = [
    {
        name: 'Discover',
        component: Discover,
        options: options,
    },

    {
        name: 'Profile',
        component: Profile,
        options: options,
    },

    {
        name: 'Settings',
        component: Settings,
        options: options,
    },

    {
        name: 'Matches',
        component: Matches,
        options: options,
    },
    {
        name: 'Match',
        component: Match,
        options: options,
    },
    {
        name: 'Chatroom',
        component: Chatroom,
        options: options,
    },
    {
        name: 'Chat',
        component: Chat,
        options: options,
    },
    {
        name: 'Done',
        component: Done,
        options: options,
    },
].concat(createFlatScreens);

export default homeScreens;
