import {FlatList, StyleSheet, Image, View} from 'react-native';
import {StoriesProfil} from '../components/Profil/StoriesProfil'
import { UsualScreen } from '../components/View/Views';
import { HugeText } from '../styles/StyledText';
import { BorderTextButton } from '../components/Buttons/UsualButton';
import { calculateNextScheduledDate } from '../primitives/HabitudesReccurence';


const NewsScreen = () => {

    const renderStoriesProfil = ({item}) => {
        return(
          <View style={{margin:15}}>
            <StoriesProfil profil={item}/>
            </View>
        )
      }

    const getNextDayToDo = (habit) => {
      const today = new Date("2024-01-30")
      console.log("##################")
      const nextDate = calculateNextScheduledDate(habit, today)
      console.log("habit : ", habit)
      console.log("Starting date : ", today.toDateString())
      console.log("Next date : ", nextDate.toDateString())
      console.log("##################")
    }

    const habitWeekDay_1 = {frequency: "Quotidien", reccurence: 1, daysOfWeek: [0,3,5]}
    const habitWeekDay_2 = {frequency: "Quotidien", reccurence: 1, daysOfWeek: [4,6]}

    const habitEachXdays = {frequency: "Quotidien", reccurence: 3, daysOfWeek: []}

    const habitEachWeek = {frequency: "Hebdo", reccurence: 1, daysOfWeek: []}
    const habitEachXWeek = {frequency: "Hebdo", reccurence: 2, daysOfWeek: []}

    const habitEachMonth = {frequency: "Mensuel", reccurence: 1, daysOfWeek: []}
    const habitEachXMonth = {frequency: "Mensuel", reccurence: 2, daysOfWeek: []}

    return(
        <UsualScreen style={[styles.storiesContainer]}>
          <HugeText text="NewsScreen"/>
          <View style={{display: "flex", flexDirection: "column", gap: 20, marginTop: 20}}>
            <BorderTextButton onPress={() => getNextDayToDo(habitWeekDay_1)} text={"Lu/Jeu/Sa"}/>
            <BorderTextButton onPress={() => getNextDayToDo(habitWeekDay_2)} text={"Ve/Di"}/>
            <BorderTextButton onPress={() => getNextDayToDo(habitEachXdays)} text={"x 3j"}/>
            <BorderTextButton onPress={() => getNextDayToDo(habitEachWeek)} text={"x 1semaines"}/>
            <BorderTextButton onPress={() => getNextDayToDo(habitEachXWeek)} text={"x 2semaines"}/>
            <BorderTextButton onPress={() => getNextDayToDo(habitEachMonth)} text={"x 1mois"}/>
            <BorderTextButton onPress={() => getNextDayToDo(habitEachXMonth)} text={"x 2mois"}/>
          </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({  
    storiesContainer: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginHorizontal: -20,
    }, 
  });

export default NewsScreen