import AccessExistingFlatProfile from '../../screens/create-profile/accessExistingFlatProfile';
import AddPictures from '../../screens/create-profile/addPictures';
import CompletePersonalProfile from '../../screens/create-profile/completePersonalProfile';
import CompleteSingleProfile from '../../screens/create-profile/completeSingleProfile';
import Done from '../../screens/create-profile/done';

const options = { headerShown: false };

const addedToFlatScreens = [
    {
        name: 'AccessExistingFlatProfile',
        component: AccessExistingFlatProfile,
        options: options,
    },
    {
        name: 'AddPictures',
        component: AddPictures,
        options: options,
    },
    {
        name: 'Done',
        component: Done,
        options: options,
    },
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
];

export default addedToFlatScreens;
