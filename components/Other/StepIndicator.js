import { StyleSheet, View } from "react-native"
import { useThemeColor } from "../Themed"

export default StepIndicator = ({totalSteps, currentStep, color, animated}) => {

    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    const highlightColor = color ? color : font

    return(
        <View style={styles.container}>
            {

                Array.from({ length: totalSteps }).map((item, index) => {
                    return(
                        <View key={item}
                        style={[styles.singleBar, 
                            {
                                backgroundColor: index < currentStep ? highlightColor : secondary
                            }
                        ]}/>
                    )
                })

            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        display: "flex", flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },

    singleBar: {
        height: 5,
        flex: 1, 
        borderRadius: 5,
    }
})