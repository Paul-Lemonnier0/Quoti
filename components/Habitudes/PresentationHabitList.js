import { View } from "react-native"
import { HabitudeListItemPresentation } from "./HabitudeListItem"
import Animated, { FadeInDown } from "react-native-reanimated"

export default PresentationHabitList = ({habits}) => {
    return(
        <View style={{gap: 20}}>
            {
                habits.map((habit, index) => (
                    <Animated.View key={index} entering={FadeInDown.duration(400).delay(200 * index)}>
                        <HabitudeListItemPresentation key={index} habitude={habit}/>
                    </Animated.View>
                ))
            }
        </View>
    )
}