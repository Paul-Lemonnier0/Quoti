import { useSharedValue } from "react-native-reanimated"
import { useRef } from "react"
import {Animated} from 'react-native'
import { HabitudeBlock } from "../Habitudes/HabitudeBlock"
import ObjectifBlock from "../Objectifs/ObjectifBlock"
import { FlatList } from "react-native"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"

export default HorizontalAnimatedFlatList = ({objectifs, currentDateString}) => {
    
    console.log(objectifs)

    const {filteredHabitsByDate} = useContext(HabitsContext)


    const doneObjectifs = objectifs.filter(objectif => {
        let steps = []
        const habits = Object.values(filteredHabitsByDate[objectif.frequency]["Objectifs"][objectif.objectifID])
        for(const habit of habits){
            steps = steps.concat(Object.values(habit.steps))
            const doneSteps = steps.filter(step => step.isChecked).length
            const totalSteps = steps.length

            return totalSteps === doneSteps
        }
    })

    const notDoneObjectifs = objectifs.filter(objectif => !doneObjectifs.includes(objectif))
    const sortedObjectif = notDoneObjectifs.concat(doneObjectifs)

    const renderObjectifs = ({item, index}) => {
        const objectifID = item.objectifID
        const frequency = item.frequency

        return (
            <ObjectifBlock key={objectifID} objectifID={objectifID} frequency={frequency}
                currentDateString={currentDateString}/>
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