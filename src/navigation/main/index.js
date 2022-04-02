import React, { useEffect } from 'react'
import { View, Text, StatusBar, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
//import { userAuthStateListener } from '../../redux/actions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../screens/splash';

const Stack = createStackNavigator()

function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Splash" onPress={()=> navigation.navigate('Splash')}/>
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}