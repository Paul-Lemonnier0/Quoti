import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useContext, useEffect, useRef } from 'react'
import { HomeStackParamsList } from '../../navigation/BottomTabNavigator'
import { StyleSheet, View } from 'react-native'
import { UsualScreen } from '../../components/View/Views'
import { Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { HugeText, TitleText } from '../../styles/StyledText'
import { StreakListCustom } from '../../components/Calendars/CalendarListCustom'
import { HabitsContext } from '../../data/HabitContext'
import BottomMenuStyle from '../../styles/StyledBottomMenu'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import HabitStreakDetailsBottomScreen from '../BottomScreens/Habitudes/HabitStreakStatsBottomScreen'

type HabitStreakDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "HabitStreakDetailsScreen">

const HabitStreakDetailsScreen: FC<HabitStreakDetailsScreenProps> = ({route, navigation}) => {
    const {Habits, HabitsHistory} = useContext(HabitsContext)
    const {habitID, currentDateString} = route.params

    const habit = Habits[habitID]
    const history = HabitsHistory[habitID]

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: BottomMenuStyle().bottomMenuStyle
        });
      }, [navigation]);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const openModal = () => {
        bottomSheetModalRef.current?.present()
    }

    console.log(habit.frequency)
    console.log(habit.startingDate)
    console.log(habit.reccurence)
    console.log(habit.occurence)

    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                        <View style={{flexDirection: "row", gap: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Icon provider={IconProvider.FontAwesome5} name="fire" color={habit.color}/>
                            <TitleText text={habit.currentStreak}/>
                        </View>
                        <IconButton name='bar-chart-2' noPadding provider={IconProvider.Feather} onPress={openModal} />
                    </View>
                    <HugeText text={"Activité"}/>

                </View>

                <View style={styles.body}>
                    <StreakListCustom currentDateString={currentDateString} history={history ?? []} habit={habit}/>
                </View>
            </View>

            <HabitStreakDetailsBottomScreen
                bottomSheetModalRef={bottomSheetModalRef}
                habit={habit}
            />
        </UsualScreen>
    )
}


const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 20, 
      flex: 1, 
      marginBottom: 30    
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        marginBottom: 5
    },

    subHeader: {
      display: "flex", 
      flexDirection: "row", 
      alignItems:"center", 
      justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 30
    },

    bodyHeader: {
        flexDirection: "row",
        gap: 20
    },

    bodyCore: {
        gap: 20
    }
});

export default HabitStreakDetailsScreen