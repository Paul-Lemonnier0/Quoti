import React, { FC, useCallback, useContext, useRef } from 'react'
import { CustomScrollView, UsualScreen } from '../../components/View/Views';
import { Image, StyleSheet, View } from 'react-native';
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons';
import Quoti from '../../components/Other/Quoti';
import { HugeText, NormalGrayText, NormalText, SubTitleText, TitleText } from '../../styles/StyledText';
import ProgressBar from '../../components/Progress/ProgressBar';
import SettingsObjectifBottomSheet from '../BottomScreens/Objectifs/SettingsObjectifBottomScreen';
import { Habit, SeriazableObjectif } from '../../types/HabitTypes';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AppContext } from '../../data/AppContext';
import { useThemeColor } from '../../components/Themed';
import PresentationHabitList from '../../components/Habitudes/PresentationHabitList';
import { convertBackSeriazableObjectif } from '../../primitives/ObjectifMethods';
import HabitudesList from '../../components/Habitudes/HabitudesList';
import IllustrationsList, { IllustrationsType } from '../../data/IllustrationsList';

interface ObjectifDetailsComponentProps {
    objectif: SeriazableObjectif,
    habits: Habit[],
    pourcentage?: number,
    handlePressHabit?: (habitude: Habit, objectifID: string | undefined, currentDateString: string) => void,
    currentDateString?: string,
    isPresentation?: boolean
}

const ObjectifDetailsComponent: FC<ObjectifDetailsComponentProps> = ({
    objectif, 
    habits, 
    pourcentage,
    currentDateString,
    handlePressHabit,
    isPresentation
}) => {

    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")

    const bottomSheetModalRef_Settings = useRef<BottomSheetModal>(null)

    const handleOpenSettings = useCallback(() => {
        bottomSheetModalRef_Settings.current?.present();
    }, []);

    const NoHabitsScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1}}>
                <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>

                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Education]}/>

                    <View style={styles.emptyScreenSubContainer}>
                        <NormalText text={"Objectif vide"}/>
                        <SubTitleText text={"Aucune habitude associée"}/>
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
                        <IconButton noPadding name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
                    </View>
                </View>


                {
                    habits.length > 0 ?

                    <CustomScrollView>
                        <View style={styles.body}>
                            <View style={styles.bodyHeader}>
                                <View style={styles.titreEtDescriptionContainer}>
                                    <HugeText text={objectif.titre} />
                                    <NormalGrayText bold text={objectif.description} />
                                </View>

                                <ProgressBar
                                    progress={pourcentage ? pourcentage/100 : 1}
                                    color={objectif.color}
                                    inactiveColor={secondary}
                                    withPourcentage
                                />
                            </View>

                            <View>
                                <TitleText text="Habitudes" />
                            </View>

                            <View style={{ flex: 1 }}>
                                {
                                    currentDateString && handlePressHabit && !isPresentation ?
                                    <HabitudesList habits={habits} handleOnPress={handlePressHabit} currentDateString={currentDateString}/>
                                    : <PresentationHabitList 
                                            isNotNewObjectifHabit 
                                            isNotObjectifIDConst 
                                            habits={habits} 
                                            deleteHabit={() => {}} 
                                            editHabit={() => {}}
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
                
                <SettingsObjectifBottomSheet bottomSheetModalRef={bottomSheetModalRef_Settings} objectif={convertBackSeriazableObjectif(objectif)}/>
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

export default ObjectifDetailsComponent