import Welcome from '../../screens/welcome-login-signup/welcome';
import Signup from '../../screens/welcome-login-signup/signup';
import SignupDetails from '../../screens/welcome-login-signup/signupDetails';
import Login from '../../screens/welcome-login-signup/login';

const options = { headerShown: false };

const loggedOutScreens = [
    {
        name: 'Welcome',
        component: Welcome,
        options: options,
    },
    {
        name: 'Signup',
        component: Signup,
        options: options,
    },
    {
        name: 'SignupDetails',
        component: SignupDetails,
        options: options,
    },
    {
        name: 'Login',
        component: Login,
        options: options,
    },
];
export default loggedOutScreens;
