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
import { View } from "react-native"
import { PresentationObjectifBlock } from "./ObjectifBlock"

interface RenderSkeletonObjectifsProps {
    item: FormDetailledObjectif,
    index: number,
    isPresentation?: boolean
}

const RenderSkeletonObjectifs: FC<RenderSkeletonObjectifsProps> = ({item, index, isPresentation}) => {

    const {theme} = useContext(AppContext)

    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")

    return (
        <Skeleton radius={20} colorMode="dark" colors={[secondary, primary, secondary]}>
            {
                isPresentation ?
                <PresentationObjectifBlock isSkeleton index={index} handleOnPress={() => {}} habits={[]} objectif={item}/> :
                <ObjectifSkeletonBlock key={index} objectif={item}/>
            }
        </Skeleton>
    )
}

interface RenderSkeletonObjectifsListProps {
    isPresentation?: boolean
}

const Objectifs_SkeletonList = memo(({isPresentation}: RenderSkeletonObjectifsListProps) => {

    const objectifs_placeholder = useMemo(() => [...Objectifs_Skeleton], [])

    return(
        <Skeleton.Group show={true} >
            {/* <MotiView transition={{type: 'timing', duration: 3}}> */}
            <View style={{gap: 20, paddingTop: 20}}>
                <FlatList 
                    data={objectifs_placeholder} 
                    renderItem={({item, index}) => 
                        <RenderSkeletonObjectifs 
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

export default Objectifs_SkeletonList