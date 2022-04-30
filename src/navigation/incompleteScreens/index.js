import ChooseStatus from '../../screens/create-profile/chooseStatus';
import CompletePersonalProfile from '../../screens/create-profile/completePersonalProfile';
import AddPictures from '../../screens/create-profile/addPictures';
import CompleteSingleProfile from '../../screens/create-profile/completeSingleProfile';
import CreateFlat from '../../screens/create-profile/createFlat';
import RoomInfo from '../../screens/create-profile/roomInfo';
import FlatInfo from '../../screens/create-profile/flatInfo';
import Done from '../../screens/create-profile/done';
import AddRoomie from '../../screens/create-profile/addRoomie';
import AccessExistingFlatProfile from '../../screens/create-profile/accessExistingFlatProfile';

const options = { headerShown: false };

export const createFlatScreens = [
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
        name: 'RoomInfo',
        component: RoomInfo,
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
    {
        name: 'Done',
        component: Done,
        options: options,
    },
    {
        name: 'AccessExistingFlatProfile',
        component: AccessExistingFlatProfile,
        options: options,
    },
];

const incompleteScreens = [
    {
        name: 'ChooseStatus',
        component: ChooseStatus,
        options: options,
    },
    {
        name: 'CompletePersonalProfile',
        component: CompletePersonalProfile,
        options: options,
    },
    {
        name: 'CompleteSingleProfile',
        component: CompleteSingleProfile,
        options: options,
    },
].concat(createFlatScreens);

export default incompleteScreens;
