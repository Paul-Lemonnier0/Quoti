import { StyleSheet, View } from "react-native"
import StepItem from "./StepItem"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { Icon, IconButton, IconProvider } from "../../Buttons/IconButtons"
import { Step } from "../../../types/HabitTypes"
import { Dispatch, FC } from "react"
import { FormStep } from "../../../types/FormHabitTypes"
import React from "react"

export interface StepsListProps {
    steps: Step[] | FormStep[],
    setSteps?: Dispatch<React.SetStateAction<(Step | FormStep)[]>>
    onStepChecked?: (step: Step | FormStep, index: number) => void,
    color: string,
    disabled?: boolean,
    editable?: boolean,
}

const StepsList: FC<StepsListProps> = ({steps, onStepChecked, color, disabled, editable, setSteps}) => {

    const isNotFormStep = steps.length > 0 && "isChecked" in steps[0]

    return(
        <View style={styles.displayColumn}>
            {
                steps.map((step: Step | FormStep, index: number) => {

                    const isNextToBeChecked = (index === 0 || ((isNotFormStep && (steps[index-1] as Step).isChecked) ?? false))
                    const handleRemoveStep = () => {
                        steps.splice(index, 1);
                        setSteps && setSteps([...steps]);
                    }

                    return(
                    <View key={index} style={styles.displayRow}>
                        <View style={{flex: 1}}>
                            <StepItem disabled={disabled} isHighlight={editable} noPress={editable} color={color} step={step} index={index} 
                            isNextToBeChecked={isNextToBeChecked} 
                                onPress={onStepChecked ? () => onStepChecked(step, index) : undefined}/>
                        </View>
                        {editable && <IconButton name={"x"} provider={IconProvider.Feather} onPress={handleRemoveStep}/>}
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

export default StepsList