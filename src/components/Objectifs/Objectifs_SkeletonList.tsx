import { FC, memo, useContext, useMemo, useRef } from "react"
import { FlatList, ListRenderItem } from "react-native"
import { Skeleton } from "moti/skeleton"
import { useThemeColor } from "../Themed"
import ObjectifSkeletonBlock from "./ObjectifSkeletonBlock"
import { Objectifs_Skeleton } from "../../constants/ObjectifsPlaceholder"
import { MotiView } from "moti"
import { Objectif } from "../../types/HabitTypes"
import { FormDetailledObjectif } from "../../types/FormObjectifTypes"
import React from "react"
import { AppContext } from "../../data/AppContext"


const Objectifs_SkeletonList = memo(() => {
    const {theme} = useContext(AppContext)

    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")

    const renderObjectifs: ListRenderItem<FormDetailledObjectif> = ({item, index}) => {

        return (
            <Skeleton radius={20} colorMode="dark" colors={[secondary, primary, secondary]}>
                <ObjectifSkeletonBlock key={index} objectif={item}/>
            </Skeleton>
        )
    }

    const objectifs_placeholder = useMemo(() => [...Objectifs_Skeleton], [])

    return(
        <Skeleton.Group show={true} >
            <MotiView transition={{type: 'timing', duration: 3}}>
            <FlatList 
                data={objectifs_placeholder} 
                renderItem={renderObjectifs}
                showsHorizontalScrollIndicator={false}
                style={{marginHorizontal: -30}}
                contentContainerStyle={{paddingHorizontal: 30, gap: 15}}
                horizontal
            />
            </MotiView>
        </Skeleton.Group>
    )
})

export default Objectifs_SkeletonList