import Loading from '../../screens/loading';
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

const loadingScreens = [
    {
        name: 'loading',
        component: Loading,
        options: options,
    },
];

export default loadingScreens;
