import AddAddress from '../../screens/create-profile/addAddress';
import AddRoomie from '../../screens/create-profile/addRoomie';
import ChooseStatus from '../../screens/create-profile/chooseStatus';
import CreateFlat from '../../screens/create-profile/createFlat';
import FlatInfo from '../../screens/create-profile/flatInfo';
import RoomInfo from '../../screens/create-profile/roomInfo';
import addedToFlatScreens from '../addedToFlatScreens';

const options = { headerShown: false };
const interPolatedTransitions = {
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

export const createFlatScreens = [
    {
        name: 'CreateFlat',
        component: CreateFlat,
        options: options,
    },
    {
        name: 'RoomInfo',
        component: RoomInfo,
        options: options,
    },
    {
        name: 'AddAddress',
        component: AddAddress,
        options: options,
    },
    {
        name: 'FlatInfo',
        component: FlatInfo,
        options: options,
    },
    {
        name: 'AddRoomie',
        component: AddRoomie,
        options: options,
    },
];

const incompleteScreens = [
    {
        name: 'ChooseStatus',
        component: ChooseStatus,
        options: interPolatedTransitions,
    },
]
    .concat(createFlatScreens)
    .concat(addedToFlatScreens);

export default incompleteScreens;
