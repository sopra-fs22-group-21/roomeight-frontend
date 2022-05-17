import AccessExistingFlatProfile from '../../screens/create-profile/accessExistingFlatProfile';
import AddAddress from '../../screens/create-profile/addAddress';
import AddPictures from '../../screens/create-profile/addPictures';
import AddRoomie from '../../screens/create-profile/addRoomie';
import ChooseStatus from '../../screens/create-profile/chooseStatus';
import CompletePersonalProfile from '../../screens/create-profile/completePersonalProfile';
import CompleteSingleProfile from '../../screens/create-profile/completeSingleProfile';
import CreateFlat from '../../screens/create-profile/createFlat';
import Done from '../../screens/create-profile/done';
import FlatInfo from '../../screens/create-profile/flatInfo';
import RoomInfo from '../../screens/create-profile/roomInfo';

const options = { headerShown: false };

export const addRoomieScreens = [
    {
        name: 'AddRoomie',
        component: AddRoomie,
        options: options,
    },
];

export const createFlatScreens = [
    {
        name: 'RoomInfo',
        component: RoomInfo,
        options: options,
    },
    {
        name: 'AddPictures',
        component: AddPictures,
        options: options,
    },

    {
        name: 'CreateFlat',
        component: CreateFlat,
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
        name: 'Done',
        component: Done,
        options: options,
    },
].concat(addRoomieScreens);
const addedScreen = [
    {
        name: 'AccessExistingFlatProfile',
        component: AccessExistingFlatProfile,
        options: options,
    },
]

export const addedScreens = addedScreen.concat(createFlatScreens);

export const chooseStatus = [
    {
        name: 'ChooseStatus',
        component: ChooseStatus,
        options: options,
    },
];

const incompleteScreens = createFlatScreens.concat([
    {
        name: 'CompleteSingleProfile',
        component: CompleteSingleProfile,
        options: options,
    },
    {
        name: 'CompletePersonalProfile',
        component: CompletePersonalProfile,
        options: options,
    },
]).concat(addedScreen);

export default incompleteScreens;
