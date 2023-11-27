import { View } from "react-native"
import { MainView } from "../View/Views"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { AnimatedBasicSpinnerView } from "./AnimatedSpinner"
import { useNavigation } from "@react-navigation/native"

export default SpinnerView = ({method, screen_output, screen_params}) => {
    const navigation = useNavigation()

    const handleMethod = async() => {
        await method();
        navigation.navigate(screen_output, screen_params)
    }

    handleMethod()

    return(
        <AnimatedBasicSpinnerView/>
    )
}