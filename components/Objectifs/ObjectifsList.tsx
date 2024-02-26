import { View } from "react-native"
import { FC, useContext } from "react"
import { BottomSheetModalMethodsContext, BottomSheetModalMethodsContextProvider } from "../../data/BottomSheetModalContext"
import { useRef } from "react"
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen"
import { FlatList } from "react-native"
import ObjectifBlock from "./ObjectifBlock"
import { HabitsContext } from "../../data/HabitContext"
import { InnerLogicObjectifType } from "../ScreenComponents/HomeScreenComponents/NotEmptyScreen"
import { FrequencyTypes, SeriazableObjectif, Step } from "../../types/HabitTypes"

interface ObjectifListProps {
    objectifs: InnerLogicObjectifType[],
    handleOnPress: (
        seriazableObjectif: SeriazableObjectif,
        frequency: FrequencyTypes,
        currentDateString: string
    ) => void,
    currentDateString: string
}

const ObjectifsList: FC<ObjectifListProps> = ({objectifs, handleOnPress, currentDateString}) => {

    const {filteredHabitsByDate} = useContext(HabitsContext)

    let doneObjectifs: InnerLogicObjectifType[] = []

    if(objectifs){
        
        doneObjectifs = objectifs.filter(objectif => {
            let steps: Step[] = []

            if(!filteredHabitsByDate[objectif.frequency]?.Objectifs?.hasOwnProperty(objectif.objectifID)){
                return false
            }

            const habits = Object.values(filteredHabitsByDate[objectif.frequency]?.Objectifs?.[objectif.objectifID] ?? {})
            for(const habit of habits){
                steps = steps.concat(Object.values(habit.steps))

                const doneSteps = steps ? steps.filter(step => step.isChecked).length : 0
                const totalSteps = steps.length
    
                return totalSteps === doneSteps
            }
        })
    }

    const notDoneObjectifs = objectifs.filter(objectif => !doneObjectifs.includes(objectif))
    const sortedObjectif = notDoneObjectifs.concat(doneObjectifs)

    const renderObjectifs = ({item, index}) => {
        const objectifID = item.objectifID
        const frequency = item.frequency

        return (
            <ObjectifBlock key={objectifID} index={index}
                objectifID={objectifID} frequency={frequency}
                currentDateString={currentDateString} handleOnPress={handleOnPress}/>
        )
    }

    return(
        <FlatList 
            data={sortedObjectif} 
            renderItem={renderObjectifs}
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: -30}}
            contentContainerStyle={{paddingHorizontal: 30, gap: 15}}
            horizontal
        />
    )
}

export default ObjectifsList