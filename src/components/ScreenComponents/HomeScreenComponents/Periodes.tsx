import { Animated, StyleSheet } from "react-native"
import { getWidthResponsive } from "../../../styles/UtilsStyles"
import { FlatList } from "react-native-gesture-handler"
import { BorderIconButton, IconProvider } from "../../Buttons/IconButtons"
import { BackgroundRadioButton } from "../../RadioButtons/RadioButton"
import { FrequencyTypes } from "../../../types/HabitTypes"
import { Dispatch, FC } from "react"
import { PeriodeType } from "../../../types/HomeScreenTypes"
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

export interface RenderPeriode {
    periode: PeriodeType | "Calendar",
    selectedPeriode: FrequencyTypes,
    setPeriode: Dispatch<PeriodeType>,
    handleOpenCalendar: () => void
}


const RenderPeriode: FC<RenderPeriode> = ({periode, selectedPeriode, setPeriode, handleOpenCalendar}) => {
    
    if(periode === "Calendar") {
        const onPressCalendar = () => {
            BottomScreenOpen_Impact()
            handleOpenCalendar()
        }
    
        return <BorderIconButton onPress={onPressCalendar} name="calendar-range-outline" provider={IconProvider.MaterialCommunityIcons}/>
    }

    const onPressPeriode = () => {
        BottomScreenOpen_Impact()
        setPeriode(periode)
    }

    const isSelected = periode.frequency === selectedPeriode

    return(
      <BackgroundRadioButton bold isHighlight={isSelected} text={periode.displayedText} number={periode.nbElements}
            handleOnClick={onPressPeriode}/>
    )
}

export interface PeriodesProps {
    periodes: (PeriodeType | "Calendar")[],
    selectedPeriode: FrequencyTypes,
    setPeriode: Dispatch<PeriodeType>,
    handleOpenCalendar: () => void,
}

export const Periodes: FC<PeriodesProps> = ({periodes, selectedPeriode, setPeriode, handleOpenCalendar}) => {
    return(
        <Animated.FlatList 
            data={periodes}

            renderItem={({item}) => (
                <RenderPeriode 
                    periode={item} 
                    setPeriode={setPeriode}
                    selectedPeriode={selectedPeriode} 
                    handleOpenCalendar={handleOpenCalendar}/>
                )
            }

            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            
            style={[styles.periodesContainerStyle]}
            contentContainerStyle={styles.periodesContentContainerStyle}
        />
    )
}

const styles = StyleSheet.create({
    periodesContainerStyle: {
        marginHorizontal: getWidthResponsive(-30)
    },

    periodesContentContainerStyle: {
        gap: getWidthResponsive(15), 
        paddingHorizontal: getWidthResponsive(30)
    }
})