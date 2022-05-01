import Login from '../../screens/welcome-login-signup/login';
import Signup from '../../screens/welcome-login-signup/signup';
import Welcome from '../../screens/welcome-login-signup/welcome';

const options = { headerShown: false };

const loggedOutScreens = [
    {
        name: 'Welcome',
        component: Welcome,
        options: {
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
                return {
                    cardStyle: {
                        opacity: progress,
                    },
                };
            },
        },
    },
    {
        name: 'Signup',
        component: Signup,
        options: options,
    },
    {
        name: 'Login',
        component: Login,
        options: options,
    },
];
export default loggedOutScreens;
