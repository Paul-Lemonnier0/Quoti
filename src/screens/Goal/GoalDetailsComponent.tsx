import React, { FC, useCallback, useContext, useRef } from 'react'
import { CustomScrollView, UsualScreen } from '../../components/View/Views';
import { Image, StyleSheet, View } from 'react-native';
import { BorderIconButton, IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons';
import Quoti from '../../components/Other/Quoti';
import { HugeText, NormalGrayText, NormalText, SubTitleText, TitleText } from '../../styles/StyledText';
import ProgressBar from '../../components/Progress/ProgressBar';
import SettingsGoalBottomSheet from '../BottomScreens/Goals/SettingsGoalBottomScreen';
import { Habit, SeriazableGoal } from '../../types/HabitTypes';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AppContext } from '../../data/AppContext';
import { useThemeColor } from '../../components/Themed';
import PresentationHabitList from '../../components/Habitudes/PresentationHabitList';
import { convertBackSeriazableGoal } from '../../primitives/GoalMethods';
import HabitudesList from '../../components/Habitudes/HabitudesList';
import IllustrationsList, { IllustrationsType } from '../../data/IllustrationsList';
import { BottomScreenOpen_Impact } from '../../constants/Impacts';

interface GoalDetailsComponentProps {
    goal: SeriazableGoal,
    habits: Habit[],
    pourcentage?: number,
    handlePressHabit?: (habitude: Habit, goalID: string | undefined, currentDateString: string) => void,
    currentDateString?: string,
    isPresentation?: boolean
}

const GoalDetailsComponent: FC<GoalDetailsComponentProps> = ({
    goal, 
    habits, 
    pourcentage,
    currentDateString,
    handlePressHabit,
    isPresentation
}) => {

    const bottomSheetModalRef_Settings = useRef<BottomSheetModal>(null)

    const handleOpenSettings = useCallback(() => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_Settings.current?.present();
    }, []);

    const NoHabitsScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1}}>
                <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>

                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Education]}/>

                    <View style={styles.emptyScreenSubContainer}>
                        <SubTitleText bold text={"Goal vide"}/>
                        <NormalGrayText bold text={"Aucune habitude associée"}/>
                    </View>
                </View>
            </View>
        )
    }

    return (  
        <UsualScreen>
            <>
                <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack} />
                        <Quoti/>
                        <BorderIconButton isBorderGray isTransparent name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
                    </View>
                </View>


                {
                    habits.length > 0 ?

                    <CustomScrollView>
                        <View style={styles.body}>
                            <View style={styles.bodyHeader}>
                                <View style={styles.titreEtDescriptionContainer}>
                                    <HugeText text={goal.titre} />
                                    <NormalGrayText bold text={goal.description} />
                                </View>

                                <ProgressBar
                                    progress={pourcentage ? pourcentage/100 : 1}
                                    color={goal.color}
                                    withPourcentage
                                />
                            </View>

                            <View>
                                <TitleText text="Habitudes" />
                            </View>

                            <View style={{ flex: 1 }}>
                                {
                                    currentDateString && handlePressHabit && !isPresentation ?
                                    <HabitudesList 
                                        habits={habits} 
                                        handleOnPress={handlePressHabit} 
                                        currentDateString={currentDateString}
                                        noAnimation
                                    />
                                    : 
                                    <PresentationHabitList 
                                        isNotNewGoalHabit 
                                        isNotGoalIDConst 
                                        habits={habits} 
                                        deleteHabit={() => {}} 
                                        editHabit={() => {}}
                                        noAnimation
                                    />
                                }
                            </View>
                        </View>
                    </CustomScrollView>

                    :
                    <View style={{flex: 1}}>
                        <NoHabitsScreen/>
                    </View>
                }
                </View>
                
                <SettingsGoalBottomSheet bottomSheetModalRef={bottomSheetModalRef_Settings} goal={convertBackSeriazableGoal(goal)}/>
            </>
        </UsualScreen>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 0,
      flexDirection: "column",
      gap: 20,
    },
    header: {
      flexDirection: "column",
      gap: 20,
      marginBottom: 5
    },
    titreEtDescriptionContainer:{
      display: "flex", 
      flex: 1,
      flexDirection: "column", 
      justifyContent: "center",
      gap: 5
    },
    subHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    body: {
      flexDirection: "column",
      gap: 30,
    },
    bodyHeader: {
      flexDirection: "column",
      gap: 15,
    },
    
    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "center",
        gap: 20, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        width: "90%", 
        maxHeight: "60%",
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },
});

export default GoalDetailsComponent