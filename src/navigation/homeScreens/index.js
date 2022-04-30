import Discover from '../../screens/discover/discover';
import Profile from '../../screens/profile';
import Settings from '../../screens/profile/settings';
import Matches from '../../screens/matches/matches';
import Match from '../../screens/matches/match';
import Chatroom from '../../screens/chatRoom';
import Chat from '../../screens/chat';

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
];

export default homeScreens;
