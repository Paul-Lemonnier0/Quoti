import { TouchableOpacity, View } from "react-native"
import React, { Dispatch, FC, useContext } from "react"
import { LittleNormalText, NormalText } from "../../styles/StyledText"
import { getPriorityDetails } from "../../primitives/StepMethods"
import { PrioritesType } from "../../types/HabitTypes"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"

interface PriorityIndicatorProps {
    priority?: PrioritesType,
    selectedPriority?: PrioritesType,
    setSelectedPriority?: Dispatch<PrioritesType>
}

const PriorityIndicator: FC<PriorityIndicatorProps> = ({priority, selectedPriority, setSelectedPriority}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")

    if(!priority || priority === PrioritesType.None){
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <NormalText text={"--"} bold/>
            </View>
        )
    }

    const isEditable = selectedPriority && setSelectedPriority
    const isSelected = selectedPriority === priority

    const priorityDetails = getPriorityDetails(priority)
    const backgroundColor = (isEditable && !isSelected) ? secondary : priorityDetails.color
    const color = (isEditable && !isSelected) ?  priorityDetails.color : "black"
    

    return(
        <TouchableOpacity disabled={!isEditable} onPress={() => setSelectedPriority ? setSelectedPriority(priority) : undefined} style={{ flex: isEditable ? 1 : undefined }}>
            <View style={{ backgroundColor, padding: 12, paddingHorizontal: 12, borderRadius: 7, alignItems: "center" }}>
                <LittleNormalText text={priorityDetails.text} style={{ color }} bold />
            </View>
        </TouchableOpacity>
    )
}

interface PriorityRadioButtonProps {
    selectedPriority: PrioritesType,
    setSelectedPriority: Dispatch<PrioritesType>
}

export const PriorityRadioButtons: FC<PriorityRadioButtonProps> = ({selectedPriority, setSelectedPriority}) => {
    const priorities = [PrioritesType.Low, PrioritesType.Medium, PrioritesType.High]
    
    return(
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            gap: 10
        }}>
            {
               priorities.map((priority) => (
                    <PriorityIndicator key={priority} priority={priority} selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority}/>
               ))
            }
        </View>
    )
}

export default PriorityIndicator