import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { CustomScrollView, UsualScreen } from "../../../components/View/Views"
import { BorderIconButton, BottomSheetCloseButton, CloseButton, IconButton, IconProvider } from "../../../components/Buttons/IconButtons"
import { StyleSheet, View } from "react-native"
import { Habit, Step } from "../../../types/HabitTypes"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import React, { FC, RefObject, useCallback, useContext, useRef } from "react"
import { FormDetailledHabit, FormDetailledObjectifHabit, FormStep } from "../../../types/FormHabitTypes"
import StepsList from "../../../components/Habitudes/Step/StepsList"
import { Image } from "react-native"
import { HugeText, NormalGrayText, SubTitleText, TitleText } from "../../../styles/StyledText"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import EditHabitNav from "../../EditScreens/Habits/EditHabitNav"
import { useThemeColor } from "../../../components/Themed"
import HabitIcons from "../../../data/HabitIcons"
import ProgressBar from "../../../components/Progress/ProgressBar"
import { FrequencyDetails } from "../../../components/Habitudes/FrequencyDetails"
import Quoti from "../../../components/Other/Quoti"
import { getSeriazableHabit } from "../../../primitives/HabitMethods"
import { AppContext } from "../../../data/AppContext"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

export interface HabitStepDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    steps: (Step | FormStep)[],
    color: string,
    icon: string,
    habit: FormDetailledObjectifHabit | Habit | FormDetailledHabit,
    editHabit: (habitID: string, newHabit: (FormDetailledObjectifHabit | Habit)) => void,
    isNotObjectifIDConst?: boolean,
    isNotNewObjectifHabit?: boolean,
}

const HabitStepDetailsBottomScreen: FC<HabitStepDetailsBottomScreenProps> = ({
    bottomSheetModalRef,
    steps,
    color,
    habit,
    editHabit,
    isNotObjectifIDConst,
    isNotNewObjectifHabit
}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const handleEdit = (newHabit: (FormDetailledObjectifHabit | Habit)) => {
        if("habitID" in habit){
            editHabit(habit.habitID, newHabit)
        }
        closeModal()
    }

    const closeModal = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.close()
    }

    const bottomSheetModalRef_EditHabit: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_EditHabit.current?.present();
      }, []);
  

    const NoStepScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1}}>
                <View style={styles.emptySreenContainer}>

                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Education]}/>

                    <View style={styles.emptyScreenSubContainer}>
                        <SubTitleText text={"Aucune étape de définie"} style={{textAlign: "center"}}/>
                    </View>
                </View>
            </View>
        )
    }

    const StepScreen = () => {
        return(
            <CustomScrollView>
                <StepsList steps={steps} color={color}/>
            </CustomScrollView>
        )
    }

    const isPlaceholder = steps.length === 0 || steps.filter(step => step.numero === -1).length > 0
    const seriazabledHabit = getSeriazableHabit(habit as Habit)

    // const startingDateString = habit.startingDate.toLocaleDateString("fr", {
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric"
    // })

    const startingDate = habit.startingDate ? new Date(habit.startingDate) : new Date()
    const startingDateString = startingDate.toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return(
        
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
            <BottomSheetModalProvider>
            <UsualScreen hideMenu>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.subHeader}>
                            <CloseButton methode={closeModal}/>
                            <Quoti/>
                            <BorderIconButton isBorderGray isTransparent name="edit-3" provider={IconProvider.Feather} onPress={handleOpenEditHabit}/>
                        </View>
                    </View>

                    <CustomScrollView>
                        <View style={styles.body}>            
                            <View style={styles.bodyHeader}>
                                <View style={[styles.displayRow, {gap: 20}]}>
                                    <View style={{borderRadius: 20, borderColor: habit.color, borderWidth: 2, padding: 15}}>
                                        <Image source={HabitIcons[habit.icon]} style={{height: 35, aspectRatio: 1}}/>
                                    </View>

                                    <View style={styles.titreEtDescriptionContainer}>
                                        <HugeText text={habit.titre}/>
                                        <NormalGrayText text={habit.description}/>
                                    </View>
                                </View>

                                <ProgressBar progress={1} color={habit.color} withPourcentage/>
                            </View>

                            <View style={{flex: 1, gap: 30}}>

                                {
                                    !isPlaceholder &&
                                    <View style={{gap: 30}}>
                                        <TitleText text={"Étapes"}/>
                                        <StepScreen/>
                                    </View>
                                }


                                <View style={{ gap: 30, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <TitleText text={"Fréquence"}/>
                                    <FrequencyDetails frequency={habit.frequency} reccurence={habit.reccurence} occurence={habit.occurence}/>
                                </View>

                                <View style={{ gap: 20, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <TitleText text={"Date de début"}/>
                                    <TitleText text={startingDateString} style={{color: fontGray}}/>
                                </View>

                            </View>
                        </View>
                    </CustomScrollView>
                </View>
            </UsualScreen>

            <EditHabitNav
                bottomSheetModalRef={bottomSheetModalRef_EditHabit}
                habit={seriazabledHabit ?? habit as FormDetailledObjectifHabit}
                objectifColor={habit.color}
                isNewObjectifHabit={!isNotNewObjectifHabit}
                validationAdditionnalMethod={() => {}}
                editHabitCustomMethod={handleEdit}
                constObjectifID={isNotObjectifIDConst ? undefined : habit.objectifID}
            />
            </BottomSheetModalProvider>
        </SimpleFullBottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30,
        marginBottom: 5
    },

    subHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 0,
        justifyContent: "center",
        alignItems: "center"
    },

    titreEtDescriptionContainer:{
        display: "flex", 
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "space-around",
        gap: 50, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        flex: 1,
        width: "90%", 
        height: undefined,
        aspectRatio: 1
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 10
    },
    
    body: {
        flex: 1, 
        marginTop: 10,
        gap: 30,
    },

    bodyHeader: {
        gap: 15,
        display: "flex",
        flexDirection: "column"
    }, 
})

export default HabitStepDetailsBottomScreen