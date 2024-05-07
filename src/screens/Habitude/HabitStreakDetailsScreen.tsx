import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UsualScreen } from '../../components/View/Views'
import { BorderIconButton, Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { HugeText, TitleText } from '../../styles/StyledText'
import { StreakListCustom } from '../../components/Calendars/CalendarListCustom'
import { HabitsContext } from '../../data/HabitContext'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { HomeStackParamsList } from '../../navigation/HomeNavigator'
import BottomMenuStyle from '../../styles/StyledBottomMenu'
import HabitStreakDetailsBottomScreen from '../BottomScreens/Habitudes/HabitStreakStatsBottomScreen'
import { calculateNextScheduledDate } from '../../primitives/HabitudesReccurence'
import { toISOStringWithoutTimeZone } from '../../primitives/BasicsMethods'
import HabitWeekDetails from '../../components/Habitudes/HabitWeekDetails'
import { FrequencyTypes } from '../../types/HabitTypes'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../../components/Themed'
import HabitMonthDetails from '../../components/Habitudes/HabitMonthDetails'
import { BottomScreenOpen_Impact } from '../../constants/Impacts'

export interface RatioType {
    total: number,
    done: number
}

type HabitStreakDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "HabitStreakDetailsScreen">

const HabitStreakDetailsScreen: FC<HabitStreakDetailsScreenProps> = ({route, navigation}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const {Habits, HabitsHistory, ArchivedHabits, DoneHabits} = useContext(HabitsContext)
    const {habitID, currentDateString, isDone, isArchived} = route.params

    const habit = 
        isArchived ? (ArchivedHabits ? ArchivedHabits[habitID] : null) :
        (isDone ? DoneHabits[habitID] 
        : Habits[habitID])

    const history = HabitsHistory[habitID]
    const historyString = history ? history.map(date => toISOStringWithoutTimeZone(date)) : []

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
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.present()
    }

    const [ratio, setRatio] = useState<RatioType>({
        total: 0,
        done: 0
    })

    useEffect(() => {
        if(habit) {
            let date = new Date(habit.startingDate)
            const today = new Date()
    
            const ratio_temp = {total: 1, done: 0}
    
            if(historyString.includes(toISOStringWithoutTimeZone(date))) {
                ratio_temp.done += 1
            }
    
            while(date <= today) {
                date = calculateNextScheduledDate(habit, date)
                if(historyString.includes(toISOStringWithoutTimeZone(date))) {
                    ratio_temp.done += 1
                }
    
                if(date < today) {
                    ratio_temp.total += 1
                }
            }
    
            setRatio(ratio_temp)
        }
    }, [])

    if(!habit) return null

    const isHebdo = habit.frequency === FrequencyTypes.Hebdo
    const isMonthly = habit.frequency === FrequencyTypes.Mensuel
    const orderByStatement = isHebdo ? "Par semaines" : (isMonthly ? "Par mois" : "Par jours")

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
                        <BorderIconButton isBorderGray isTransparent name='bar-chart-2' provider={IconProvider.Feather} onPress={openModal} />
                    </View>

                    <View>
                        <HugeText text={"Votre activité"}/>
                        {
                            (isHebdo || isMonthly) &&
                            <TitleText text={orderByStatement} style={{color: fontGray}}/>
                        }
                    </View>

                </View>

                <View style={styles.body}>
                    {
                        isHebdo ?
                        <HabitWeekDetails habit={habit} history={history}/> :

                        isMonthly ?
                        <HabitMonthDetails habit={habit} history={history}/> :
                        <StreakListCustom currentDateString={currentDateString} history={history ?? []} habit={habit}/>
                    }
                </View>
            </View>

            <HabitStreakDetailsBottomScreen
                bottomSheetModalRef={bottomSheetModalRef}
                habit={habit}
                ratio={ratio}
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
      marginBottom: 30,
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