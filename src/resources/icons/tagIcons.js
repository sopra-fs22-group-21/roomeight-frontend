import en from '../strings/en.json';
import tags from '../strings/tags';
// search icons here: https://oblador.github.io/react-native-vector-icons/

const tagIcons = [
    {
        name: tags.working,
        label: en.tags.work,
        icon: 'work-outline',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.student,
        label: en.tags.student,
        icon: 'school',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.pets,
        label: en.tags.pets,
        icon: 'pets',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.party,
        label: en.tags.party,
        icon: 'nightlife',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.smoker,
        label: en.tags.smoker,
        icon: 'smoking-rooms',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.sports,
        label: en.tags.sporty,
        icon: 'sports-volleyball',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.cooking,
        label: en.tags.cooking,
        icon: 'chef-hat',
        type: 'material-community',
        isSelected: false,
    },
    {
        name: tags.instruments,
        label: en.tags.instruments,
        icon: 'guitar-acoustic',
        type: 'material-community',
        isSelected: false,
    },
    {
        name: tags.cleanliness,
        label: en.tags.cleanliness,
        icon: 'clean-hands',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.coffee,
        label: en.tags.coffee,
        icon: 'coffee',
        type: 'feather',
        isSelected: false,
    },
    {
        name: tags.wine,
        label: en.tags.wine,
        icon: 'wine-bar',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.woko,
        label: en.tags.woko,
        icon: 'done',
        type: 'material',
        isSelected: false,
    },
    {
        name: tags.juwo,
        label: en.tags.juwo,
        icon: 'done',
        type: 'material',
        isSelected: false,
    },
    {
        name: 'PEACEFUL',
        label: 'peaceful',
        icon: 'self-improvement',
        type: 'material',
        isSelected: false,
    },
];

export default tagIcons;
