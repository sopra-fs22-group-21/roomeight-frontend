import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { goOnline, goOffline } from 'firebase/database';
import { database } from '../../firebase/firebase-config';

export function handleAppStateChange(currentState) {
    switch (currentState) {
        case 'active':
            console.log('foregrounded');
            goOnline(database);
            break;
        case 'background':
            console.log('backgrounded');
            goOffline(database);
            break;
        default:
            break;
    }
}

/**
 * Asks for permissions to send push notifications
 * @returns the pushToken
 */
export const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert(
                'To use the app as intended you need to grant push notifications permissions'
            );
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        return token;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
};
