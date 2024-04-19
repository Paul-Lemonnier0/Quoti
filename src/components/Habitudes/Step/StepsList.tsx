import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import StepItem from "./StepItem"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { Icon, IconButton, IconProvider } from "../../Buttons/IconButtons"
import { Step } from "../../../types/HabitTypes"
import { Dispatch, FC, useRef } from "react"
import { FormFullStep, FormPlaceholderStep, FormStep } from "../../../types/FormHabitTypes"
import React from "react"
import DraggableFlatList, {
    ScaleDecorator,
  } from "react-native-draggable-flatlist";
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import StepDetailsBottomScreen from "../../../screens/BottomScreens/Habitudes/Steps/StepDetailsBottomScreen"
import AddStepBottomScreen from "../../../screens/BottomScreens/AddStepBottomScreen"

export interface StepsListProps {
    steps: Step[] | FormStep[],
    setSteps?: Dispatch<React.SetStateAction<(Step | FormStep)[]>>
    onStepChecked?: (step: Step | FormStep, index: number) => void,
    color: string,
    disabled?: boolean,
    editable?: boolean,
    softDisabled?: boolean
}

interface RenderStepProps extends StepsListProps {
    isNotFormStep: boolean,
    step: Step | FormStep,
    drag?: () => void
}

const RenderStep: FC<RenderStepProps> = ({
    step, 
    steps, 
    disabled, 
    editable, 
    onStepChecked, 
    isNotFormStep, 
    color,
    setSteps,
    drag,
    softDisabled
}) => {

    const index = steps.indexOf(step as Step)

    const isNextToBeChecked = (index === 0 || ((isNotFormStep && (steps[index-1] as Step).isChecked) ?? false))

    const handleRemoveStep = () => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps ? setSteps(updatedSteps) : null
    }
    
    const handleLongPress = drag ? drag : () => {};
    const checkStep = onStepChecked ? () => onStepChecked(step, index) : undefined

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const openModal = () => {
        bottomSheetModalRef.current?.present()
    }

    const areAllStepsChecked = steps.filter(step => (step as Step).isChecked).length === steps.length

    if(editable) {
        return(
            <ScaleDecorator activeScale={1.075}>
                <TouchableOpacity disabled={!drag} key={index} style={styles.displayRow} 
                    onLongPress={handleLongPress} onPress={openModal}>
                    <View style={{flex: 1}}>
                        <StepItem 
                            disabled={disabled} 
                            isHighlight={editable} 
                            noPress={editable} 
                            color={color} 
                            step={step} 
                            index={index} 
                            isNextToBeChecked={isNextToBeChecked}
                            isEditable={editable} 
                            areAllStepsChecked={areAllStepsChecked}
                            onDelete={handleRemoveStep}
                            onPress={checkStep}
                        />
                    </View>
                </TouchableOpacity>

                {
                    editable && setSteps ? 

                    <AddStepBottomScreen
                        baseStep={(step as Step | FormFullStep)}
                        bottomSheetModalRef={bottomSheetModalRef}
                        setSteps={setSteps}
                    />

                    :

                    <StepDetailsBottomScreen
                        areAllStepsChecked={areAllStepsChecked}
                        step={step}
                        bottomSheetModalRef={bottomSheetModalRef}
                        color={color}
                        checkStep={checkStep}
                        disabled={disabled}
                    />
                }
            </ScaleDecorator>
        )    
    }

    return(
        <>
            <TouchableOpacity disabled={disabled} key={index} style={styles.displayRow} 
                onLongPress={handleLongPress} onPress={openModal}>
                <View style={{flex: 1}}>
                    <StepItem 
                        disabled={disabled} 
                        isHighlight={editable} 
                        noPress={editable} 
                        color={color}
                        step={step} 
                        index={index} 
                        isNextToBeChecked={isNextToBeChecked} 
                        isEditable={editable}
                        areAllStepsChecked={areAllStepsChecked || softDisabled} 
                        onDelete={handleRemoveStep}
                        onPress={checkStep}
                    />
                </View>
            </TouchableOpacity>
            {
                editable && setSteps ? 

                <AddStepBottomScreen
                    baseStep={(step as Step | FormFullStep)}
                    bottomSheetModalRef={bottomSheetModalRef}
                    setSteps={setSteps}
                />

                :

                <StepDetailsBottomScreen
                    step={step}
                    bottomSheetModalRef={bottomSheetModalRef}
                    color={color}
                    checkStep={checkStep}
                    areAllStepsChecked={areAllStepsChecked}
                    isChecked={(step as Step).isChecked}
                    disabled={disabled}
                />
            }
        </>
    )
}

const StepsList: FC<StepsListProps> = ({steps, onStepChecked, color, disabled, editable, setSteps}) => {

    const isNotFormStep = steps.length > 0 && "isChecked" in steps[0]

    if(editable) {
        return(
            <View style={styles.displayColumn}>
                <DraggableFlatList
                    data={steps}
                    style={{flex: 1}}
                    containerStyle={{ flex : 1 }}
                    renderItem={({ item, drag }) => (
                        <RenderStep
                            step={item as (Step | FormStep)}
                            onStepChecked={onStepChecked}
                            color={color}
                            disabled={disabled}
                            editable={editable}
                            setSteps={setSteps}
                            isNotFormStep={isNotFormStep}
                            steps={steps}
                            drag={drag}
                            key={(item as (Step | FormStep)).numero}
                        />
                    )}
    
                    onDragEnd={({ data }) => {
                        setSteps ? setSteps(data) : null
                    }}
    
                    keyExtractor={(item) => {
                        if((item as FormPlaceholderStep).numero === -1)
                            return "-1"
                        else if("stepID" in item) {
                            return (item as (Step | FormFullStep)).stepID
                        }

                        else if("habitID" in item) {
                            return (item as Step).habitID
                        }

                        return ""
                    }}
    
                />
            </View>
        )
    }
    
    return (
        <View style={styles.displayColumn}>
            {
                steps.map((step: Step | FormStep, index: number) => 
                    <RenderStep
                        key={index}
                        step={step}
                        onStepChecked={onStepChecked}
                        color={color}
                        disabled={disabled}
                        editable={false}
                        setSteps={setSteps}
                        isNotFormStep={isNotFormStep}
                        steps={steps}/>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        paddingHorizontal: 80,
        marginVertical: 5
    },

    displayColumn: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        marginHorizontal: -80,
        marginTop: -5
    },
})

export default StepsList