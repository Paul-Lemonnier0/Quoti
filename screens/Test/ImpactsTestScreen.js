import { View } from "react-native"
import { BorderTextButton } from "../../components/Buttons/UsualButton"
import * as Haptics from 'expo-haptics';

export default ImpactsTestScreen = () => {
    return(
        <View style={{display: "flex", flexDirection: "column", gap: 5}}>
            <BorderTextButton text={"Selection"} onPress={() => {Haptics.selectionAsync()}}/>
            <BorderTextButton text={"Impact Light"} onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}/>
            <BorderTextButton text={"Impact Medium"} onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}/>
            <BorderTextButton text={"Impact Heavy"} onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}}/>
            <BorderTextButton text={"Success"} onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}}/>
            <BorderTextButton text={"Warning"} onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}}/>
            <BorderTextButton text={"Error"} onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}}/>
        </View>
    )
}