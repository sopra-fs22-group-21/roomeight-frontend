import Chat from '../../screens/chat';
import Chatroom from '../../screens/chatRoom';
import Discover from '../../screens/discover/discover';
import Match from '../../screens/matches/match';
import Matches from '../../screens/matches/matches';
import Profile from '../../screens/Profile';
import Settings from '../../screens/Profile/settings';
import LikesFlat from '../../screens/matches/matches/likesFlat';
import MatchesFlat from '../../screens/matches/matches/matchesFlat';

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
        name: 'MatchesFlat',
        component: MatchesFlat,
        options: options,
    },
    {
        name: 'LikesFlat',
        component: LikesFlat,
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
