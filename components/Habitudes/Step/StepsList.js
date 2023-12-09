import { StyleSheet, View } from "react-native"
import StepItem from "./StepItem"
import { VerticalSeparator } from "../../Other/Separator"

export default StepsList = ({steps, onStepChecked, color, disabled}) => {

    return(
        <View>
            {
                steps.map((step, index) => {

                    const isNextToBeChecked = (index === 0 || steps[index-1].isChecked)
            
                    return(
                    <View key={index} style={styles.displayColumn}>
                        <StepItem disabled={disabled} color={color} step={step} index={index} isNextToBeChecked={isNextToBeChecked} onPress={() => onStepChecked(step, index)}/>
                    </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    displayColumn: {
        display: "flex",
        flexDirection: "column",
        marginVertical: 20
    }
})