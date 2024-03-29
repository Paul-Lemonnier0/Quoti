import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { CustomScrollView, UsualScreen } from "../../../components/View/Views"
import { CloseButton, IconButton, IconProvider } from "../../../components/Buttons/IconButtons"
import { StyleSheet, View } from "react-native"
import { Habit, Step } from "../../../types/HabitTypes"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { FC, RefObject, useCallback, useRef } from "react"
import { FormDetailledHabit, FormDetailledObjectifHabit, FormStep } from "../../../types/FormHabitTypes"
import StepsList from "../../../components/Habitudes/Step/StepsList"
import { Image } from "react-native"
import { HugeText, NormalText, SubTitleText, TitleText } from "../../../styles/StyledText"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import EditHabitNav from "../../EditScreens/Habits/EditHabitNav"

export interface HabitStepDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    steps: (Step | FormStep)[],
    color: string,
    icon: string,
    habit: FormDetailledObjectifHabit | Habit | FormDetailledHabit,
    editHabit: (habitID: string, newHabit: (FormDetailledObjectifHabit | Habit)) => void
}

const HabitStepDetailsBottomScreen: FC<HabitStepDetailsBottomScreenProps> = ({
    bottomSheetModalRef,
    steps,
    icon,
    color,
    habit,
    editHabit
}) => {

    const handleEdit = (newHabit: (FormDetailledObjectifHabit | Habit)) => {
        if("habitID" in habit){
            editHabit(habit.habitID, newHabit)
        }
        closeModal()
    }

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    const bottomSheetModalRef_EditHabit: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
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
                <StepsList steps={steps} editable color={color}/>
            </CustomScrollView>
        )
    }

    // const handleEdit = () => {
    //     bottomSheetModalRef.current?.close()
    //     handleOpenEdit()
    // }

    const isPlaceholder = steps[0].numero === -1
    return(

        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} isPrimary>
            <UsualScreen hideMenu>
                <View style={styles.container}>
                    <View style={styles.header}>


                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <CloseButton noPadding methode={closeModal}/>
                            <IconButton name="edit-3" provider={IconProvider.Feather} noPadding onPress={handleOpenEditHabit}/>
                        </View>

                    </View>

                    <CustomScrollView>
                        <View style={{flex: 1, gap: 30}}>
                            <View style={{gap: 30}}>
                                <HugeText text={"Étapes"}/>

                                {
                                    isPlaceholder ?
                                    <NoStepScreen/>
                                    :
                                    <StepScreen/>
                                }
                            </View>

                            <View style={{gap: 30}}>
                                <HugeText text={"Détails"}/>

{                                // TODO: occurence, reccurence, jour de la semaine, frequence
}
                            </View>
                        </View>
                    </CustomScrollView>

                    

                    <View style={styles.footer}>
                    </View>
                </View>


            </UsualScreen>

            {
                <EditHabitNav
                    bottomSheetModalRef={bottomSheetModalRef_EditHabit}
                    habit={habit as FormDetailledObjectifHabit}
                    objectifColor={habit.color}
                    isNewObjectifHabit
                    validationAdditionnalMethod={() => {}}
                    editHabitCustomMethod={handleEdit}
                />
            }



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
        gap: 30
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 0
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
        marginLeft: 5,
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

    footer: {
        justifyContent: "center",
        flex: 0.20,
    }
})

export default HabitStepDetailsBottomScreen