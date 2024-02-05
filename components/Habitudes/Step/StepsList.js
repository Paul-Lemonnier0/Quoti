import { StyleSheet, View } from "react-native"
import StepItem from "./StepItem"
import { VerticalSeparator } from "../../Other/Separator"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { Icon, IconButton } from "../../Buttons/IconButtons"

export default StepsList = ({steps, onStepChecked, color, disabled, editable, setSteps}) => {

    return(
        <View style={styles.displayColumn}>
            {
                steps.map((step, index) => {

                    const isNextToBeChecked = (index === 0 || steps[index-1].isChecked)
                    const handleRemoveStep = () => {
                        steps.splice(index, 1);
                        setSteps([...steps]);
                    }

                    return(
                    <View key={index} style={styles.displayRow}>
                        <View style={{flex: 1}}>
                            <StepItem disabled={disabled} isHighlight={editable} noPress={editable} color={color} step={step} index={index} isNextToBeChecked={isNextToBeChecked} onPress={() => onStepChecked(step, index)}/>
                        </View>
                        {editable && <IconButton name={"x"} provider={"Feather"} onPress={handleRemoveStep}/>}
                    </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 20
    },

    displayColumn: {
        display: "flex",
        flexDirection: "column",
        gap: getHeightResponsive(20)
    },
})