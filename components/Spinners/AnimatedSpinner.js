import { View } from "react-native"
import { useThemeColor } from "../Themed"
import LottieView from "lottie-react-native"

export const AnimatedBasicSpinner = () => {
    return(<LottieView source={require('../../assets/spinners/AnimatedCircleSpinner.json')} autoPlay loop />)
}

export const AnimatedBasicSpinnerView = () => {
    return(
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <AnimatedBasicSpinner/>
        </View>
    )
}