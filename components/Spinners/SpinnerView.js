import { ActivityIndicator, Modal, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { AnimatedBasicSpinner, AnimatedBasicSpinnerView } from "./AnimatedSpinner"
import { useNavigation } from "@react-navigation/native"
import { ViewBase } from "react-native"

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

export const CustomSpinnerView = () => {
    return(
        <Modal animationType="fade" transparent={true}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.33)', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large"/>
            </View>
        </Modal>
    )
}