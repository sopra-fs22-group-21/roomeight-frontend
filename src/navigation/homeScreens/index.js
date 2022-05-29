import Chat from '../../screens/chat';
import Chatroom from '../../screens/chatRoom';
import Done from '../../screens/create-profile/done';
import Discover from '../../screens/discover/discover';
import Match from '../../screens/matches/match';
import Matches from '../../screens/matches/matches';
import MatchInProgress from '../../screens/matches/matchInProgress';
import Profile from '../../screens/profile';
import Settings from '../../screens/profile/settings';
import addedToFlatScreens from '../addedToFlatScreens';
import { createFlatScreens } from '../incompleteScreens';

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
        name: 'MatchInProgress',
        component: MatchInProgress,
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
]
    .concat(createFlatScreens)
    .concat(addedToFlatScreens);

export default homeScreens;
