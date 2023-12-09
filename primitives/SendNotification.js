import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';


export async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "N'oubliez pas !",
            body: "Validez vos habitudes",
            data: {data: "goes here"},
        },

        trigger: {seconds: 2}
    })
}

export async function sendNotification(){
    let token;

    if(Platform.OS === "android"){
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    if(Device.isDevice){
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus

        if(existingStatus !== 'granted'){
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }

        if(finalStatus !== 'granted'){
            alert('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync({}))
    }
}