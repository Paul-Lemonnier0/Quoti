import React, { FC, RefObject, useContext } from 'react'
import { CustomStaticBottomSheet } from '../../components/BottomSheets/CustomBottomSheet'
import { StyleSheet, View } from 'react-native'
import { HugeText, MassiveText, SubMassiveText, SubTitleGrayText, TitleText } from '../../styles/StyledText'
import { BottomSheetCloseButton, CloseButton, Icon, IconProvider } from '../../components/Buttons/IconButtons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useThemeColor } from '../../components/Themed'
import { AppContext } from '../../data/AppContext'
import { HabitActivityState } from '../../types/HabitTypes'
import { shortWeekStringFormat } from '../../primitives/DateBasicMethods'
import { BottomScreenOpen_Impact } from '../../constants/Impacts'


export interface StreakDayDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    date: Date,
    state: HabitActivityState,
    color: string,
    endDate?: Date,
    firstDayOfMonth?: Date
}

const StreakDayDetailsBottomScreen: FC<StreakDayDetailsBottomScreenProps> = ({
    bottomSheetModalRef,
    date,
    endDate,
    firstDayOfMonth,
    state,
    color
}) => {

    const {theme} = useContext(AppContext)
    const error = useThemeColor(theme, "Error")
    const success = useThemeColor(theme, "Success")
    const fontGray = useThemeColor(theme, "FontGray")

    const statements = {
        [HabitActivityState.Done]: "Effectuée",
        [HabitActivityState.Missed]: "Manquée",
        [HabitActivityState.Scheduled]: "Planifiée",
        [HabitActivityState.None]: "Non planifiéee",
    }

    const colors = {
        [HabitActivityState.Done]: color,
        [HabitActivityState.Missed]: error,
        [HabitActivityState.Scheduled]: success,
        [HabitActivityState.None]: fontGray,
    }

    const iconNames = {
        [HabitActivityState.Done]: "check",
        [HabitActivityState.Missed]: "x",
        [HabitActivityState.Scheduled]: "clock",
        [HabitActivityState.None]: "coffee",
    }


    const statement = statements[state]
    const finalColor = colors[state]
    const iconName = iconNames[state]

    const closeModal = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.close()
    }

    let finalDateString = ""

    const today = new Date()
    const isPlanned = state !== HabitActivityState.None
    let was = false

    if(endDate) {
        if(endDate <= today) {
            was = true
        }

        finalDateString = 
            date.toLocaleDateString("fr", { day: "numeric" }) + " - " +
            endDate.toLocaleDateString("fr", { day: "numeric", month: "short" })
    }

    else if (firstDayOfMonth) {
        if(firstDayOfMonth.getMonth() < today.getMonth()) {
            was = true
        }

        finalDateString = firstDayOfMonth.toLocaleDateString("fr", { month: "long" })
    }

    else {
        if(date < today) {
            was = true
        }

        finalDateString =  date.toLocaleDateString("fr", {
            day: "numeric",
            month: "long"
        })
    }

    const yearString = firstDayOfMonth ? firstDayOfMonth.getFullYear() : (endDate ? endDate.getFullYear() : date.getFullYear())

    const isMissed = state === HabitActivityState.Missed
    const scheduledStatement = (isPlanned ? (was ? "était" : "est") : ("n'" + (was ? "était" : "est") +" pas")) + " prévue "

    const conjonctionStatement = isMissed ? "mais n'a " : "et à "

    const stateStatement = (isMissed ? "pas " : "") + "été réalisée"
        

    return (
        <CustomStaticBottomSheet 
            footerMethod={closeModal}
            footerText="Terminer"
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <SubTitleGrayText text={yearString}/>  
                        <SubMassiveText text={finalDateString}/>  
                    </View> 
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <View style={{flexDirection: "column", gap: 40, marginBottom: 10}}>

                <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        <TitleText text={"L'habitude "} style={{color: fontGray}}>
                            <TitleText text={scheduledStatement}  />
                            {
                                isPlanned && was && 
                                <TitleText text={conjonctionStatement}  style={{color: fontGray}}/>
                            }
                            
                            {
                                (isPlanned && was) ?
                                <TitleText text={stateStatement} style={{color: finalColor}}/> :
                                <TitleText text={"pour cette période"} style={{color: fontGray}}/>
                            }
                        </TitleText>
                    </View>
                </View>
            </View>
        </CustomStaticBottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 30, 
        marginBottom: 30,
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        marginVertical: 20
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between",
        gap: 20,
    },
})

export default StreakDayDetailsBottomScreen