import { FC, memo, useContext, useMemo, useRef } from "react"
import { FlatList, ListRenderItem } from "react-native"
import { Skeleton } from "moti/skeleton"
import { useThemeColor } from "../Themed"
import GoalSkeletonBlock from "./GoalSkeletonBlock"
import { Goals_Skeleton } from "../../constants/GoalsPlaceholder"
import { MotiView } from "moti"
import { Goal } from "../../types/HabitTypes"
import { FormDetailledGoal } from "../../types/FormGoalTypes"
import React from "react"
import { AppContext } from "../../data/AppContext"
import { View } from "react-native"
import { PresentationGoalBlock } from "./GoalBlock"

interface RenderSkeletonGoalsProps {
    item: FormDetailledGoal,
    index: number,
    isPresentation?: boolean
}

const RenderSkeletonGoals: FC<RenderSkeletonGoalsProps> = ({item, index, isPresentation}) => {

    const {theme} = useContext(AppContext)

    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")

    return (
        <Skeleton radius={20} colorMode="dark" colors={[secondary, primary, secondary]}>
            {
                isPresentation ?
                <PresentationGoalBlock isSkeleton index={index} handleOnPress={() => {}} habits={[]} goal={item}/> :
                <GoalSkeletonBlock key={index} goal={item}/>
            }
        </Skeleton>
    )
}

interface RenderSkeletonGoalsListProps {
    isPresentation?: boolean
}

const Goals_SkeletonList = memo(({isPresentation}: RenderSkeletonGoalsListProps) => {

    const goals_placeholder = useMemo(() => [...Goals_Skeleton], [])

    return(
        <Skeleton.Group show={true} >
            {/* <MotiView transition={{type: 'timing', duration: 3}}> */}
            <View style={{gap: 20, paddingTop: 20}}>
                <FlatList 
                    data={goals_placeholder} 
                    renderItem={({item, index}) => 
                        <RenderSkeletonGoals 
                            item={item} 
                            index={index} 
                            isPresentation={isPresentation}
                        />
                    }
                    showsHorizontalScrollIndicator={false}
                    style={{marginHorizontal: -30}}
                    contentContainerStyle={{paddingHorizontal: 30, gap: 15}}
                    horizontal
                />
            </View>
            {/* </MotiView> */}
        </Skeleton.Group>
    )
})

export default Goals_SkeletonList