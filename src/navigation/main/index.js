import React, { useEffect } from 'react'
import { View, Text, StatusBar, Button } from 'react-native'
//import { userAuthStateListener } from '../../redux/actions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../screens/splash';
import Signup from '../../screens/signup';

const Stack = createStackNavigator()

function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Splash" onPress={()=> navigation.navigate('Splash')}/>
        <Button title="Signup" onPress={()=> navigation.navigate('Signup')}/>
      </View>
    );
  }

export default function Route() {
    /* const currentUserObj = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj.loaded) {
        return (
            <View></View>
        )
    } */

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Details" component={DetailsScreen}/>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}