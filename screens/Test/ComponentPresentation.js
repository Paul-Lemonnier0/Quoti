import React, { useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View} from 'react-native';
import { TitleText } from '../../styles/StyledText';
import { UsualScreen } from '../../components/View/Views';
import { BackgroundIconButton, BorderIconButton, IconButton, NavigationButton } from '../../components/Buttons/IconButtons';
import { ScrollView } from 'react-native';
import { BackgroundTextButton, BorderTextButton } from '../../components/Buttons/UsualButton';
import SelectDateBottomScreen from '../BottomScreens/SelectDateBottomScreen';
import { PasswordInputCustom, TextInputCustom } from '../../components/TextFields/TextInput';
import { DatePicker } from '../../components/TextFields/DatePicker';
import { IncrementButtons, IncrementTime } from '../../components/Buttons/IncrementButtons';
import { BackgroundRadioButton, BorderRadioButton } from '../../components/RadioButtons/RadioButton';
import { FlatList } from 'react-native';

const ComponentPresentation = () => {

  //PERIODES

  const [selectedPeriode, setSelectedPeriode] = useState("Quotidien")

  const initialPeriodes = [
    {frequency: "Radio1", displayedText: "Radio", nbElement: 1}, 
    {frequency: "Radio2", displayedText: "Radio", nbElement: 2}, 
  ]

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [incrementValue, setIncrementValue] = useState(1)
  const [incrementHour, setIncrementHour] = useState(1)
  const [incrementMinutes, setIncrementMinutes] = useState(30)

  const handleChangeSelectedDate = async(date) =>  {
    setSelectedDate(date)
  }


  //BOTTOM SHEETS

  const bottomSheetModalRef_Calendar = useRef(null);
  const snapPoints_Calendar = useMemo(() => ['55%'], []);

  const handleOpenCalendar = useCallback(() => {
        bottomSheetModalRef_Calendar.current?.present();
    }, []);

  const handleSheetChangesCalendar = useCallback((index) => {
  }, []);

  const handleChangeSelectedPeriode = (newPeriode) => {
    setSelectedPeriode(newPeriode.frequency)
  }

  const renderRadios = ({item}) => {

    const isSelected = item.frequency === selectedPeriode

    return(
      <BackgroundRadioButton isHighlight={true} text={"hello"}
            handleOnClick={() => handleChangeSelectedPeriode(item)}/>
    )
  }

  const renderRadiosBold = ({item}) => {

    const isSelected = item.frequency === selectedPeriode

    return(
      <BackgroundRadioButton isHighlight={true} text={"hello"}
            handleOnClick={() => handleChangeSelectedPeriode(item)}/>
    )
  }

  const renderRadiosDisabled = ({item}) => {

    const isSelected = item.frequency === selectedPeriode

    return(
      <BackgroundRadioButton isHighlight={true} text={"hello"}
            handleOnClick={() => handleChangeSelectedPeriode(item)}/>
    )
  }


  return (
      <UsualScreen hideMenu>
        <ScrollView style={{flex: 1, marginVertical: -50}} showsVerticalScrollIndicator={false}>
          <View style={[styles.displayColumn, {gap: 20, paddingVertical: 50, flex: 1}]}>

            
            <View style={[styles.displayColumn, {gap: 10}]}>

                <View style={{marginBottom: 20}}>
                    <TitleText text="Inputs"/>
                </View>

                <TextInputCustom labelName={"Default"} placeholder={"Default placeholder"}/>
                <PasswordInputCustom labelName={"Password"} placeholder={"Default placeholder"}/>
                <TextInputCustom labelName={"Disabled"} placeholder={"Disabled placeholder"} disabled/>
                <TextInputCustom labelName={"Error"} placeholder={"Error placeholder"} errorMessage={"Entrez une valeur valide"} isWrong/>
                <DatePicker onPress={handleOpenCalendar} date={selectedDate} label={"Default datepicker"}/>

            </View>

            <View style={[styles.displayColumn, {gap: 15}]}>

                <TitleText text="Buttons"/>

                <BackgroundTextButton text={"Ajouter"}/>
                <BackgroundTextButton text={"Disabled"} disabled/>
                <BorderTextButton text={"Ajouter"}/>
                <BorderTextButton text={"Ajouter"} disabled/>
            </View>

            <View style={[styles.displayColumn, {gap: 15}]}>

                <TitleText text="Icons"/>

                <View style={[styles.displayRow, {gap: 15}]}>
                    <BorderIconButton onPress={() => {}} name="bar-chart" provider="Feather"/>
                    <BorderIconButton onPress={() => {}} name="bar-chart" provider="Feather" disabled/>
                </View>
                <View style={[styles.displayRow, {gap: 15}]}>
                    <BackgroundIconButton onPress={() => {}} name="bar-chart" provider="Feather"/>
                    <BackgroundIconButton onPress={() => {}} name="bar-chart" provider="Feather" disabled/>
                </View>
            
                <View style={[styles.displayRow, {gap: 15}]}>
                    <IconButton onPress={() => {}} name="bar-chart" provider="Feather"/>
                    <IconButton onPress={() => {}} name="bar-chart" provider="Feather" disabled/>
                </View>
            
            </View>

            <View style={[styles.displayColumn, {gap: 15}]}>

              <TitleText text="Navigation"/>

              <View style={[styles.displayRow, {gap: 15, justifyContent: "space-between"}]}>
                  <NavigationButton action={"goBack"}/>
                  <NavigationButton action={"goNext"} disabled/>
                  <NavigationButton action={"validation"}/>
                  <NavigationButton action={"close"} disabled/>
              </View>

            </View>

            <View style={[styles.displayColumn, {gap: 15}]}>

              <TitleText text="Increment"/>

              <View style={[styles.displayRow, {gap: 15, justifyContent: "space-between"}]}>
                  <IncrementTime value={incrementHour} setValue={setIncrementHour}/>
                  <IncrementTime value={incrementMinutes} setValue={setIncrementMinutes} isMinutes isBorderHidden/>
              </View>

              <View style={[styles.displayRow, {gap: 15, justifyContent: "space-between"}]}>
                  <IncrementButtons value={incrementValue} setValue={setIncrementValue}/>
                  <IncrementButtons value={incrementValue} setValue={setIncrementValue} isBorderHidden/>
              </View>
            </View>

            <View style={[styles.displayColumn, {gap: 15}]}>

              <TitleText text="Radios"/>

              <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                        renderItem={renderRadios}
                        data={initialPeriodes}
                        style={{marginHorizontal: -30, marginBottom: 20}}
                        contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>

              <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                      renderItem={renderRadiosBold}
                      data={initialPeriodes}
                      style={{marginHorizontal: -30, marginBottom: 20}}
                      contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>
              
              <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                      renderItem={renderRadiosDisabled}
                      data={initialPeriodes}
                      style={{marginHorizontal: -30, marginBottom: 20}}
                      contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>

              <BorderRadioButton hideInactiveBorder text="Radio1" handleOnClick={() => setSelectedPeriode("Radio1")} isHighlight={selectedPeriode === "Radio1"}/>
              <BorderRadioButton hideInactiveBorder text="Radio2" handleOnClick={() => setSelectedPeriode("Radio2")} isHighlight={selectedPeriode === "Radio2"}/>
              
              <BorderRadioButton disabled hideInactiveBorder text="Radio1" handleOnClick={() => setSelectedPeriode("Radio1")} isHighlight={selectedPeriode === "Radio1"}/>
              <BorderRadioButton disabled hideInactiveBorder text="Radio2" handleOnClick={() => setSelectedPeriode("Radio2")} isHighlight={selectedPeriode === "Radio2"}/>
            </View>

          </View>
        </ScrollView>

        <SelectDateBottomScreen 
          selectedDate={selectedDate}
          setSelectedDate={handleChangeSelectedDate}
          bottomSheetModalRef={bottomSheetModalRef_Calendar} 
          snapPoints={snapPoints_Calendar} 
          handleSheetChanges={handleSheetChangesCalendar}/>
    </UsualScreen>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 0,
    paddingBottom: 0,
    flex:1,
    gap: 20,
    display: "flex", 
  },

  header: {
    gap: 20
  },

  ProfilContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  habitsContainer: {
    margin: -15,
    marginTop: 0,
  },

  loadingAndEmptyScreenContainer: {
    flex:1,
    flexGrow: 1,
  },

  dayPlanContainer: {
    flex:1,
    flexGrow: 1,
    marginHorizontal: -30,
    paddingHorizontal: 30,
    marginBottom: -150,
    paddingBottom: 150,
  },

  center:{
    display:"flex", 
    flexDirection: "column", 
    justifyContent: "center"
  },

  displayColumn:{
    display: "flex", 
    flexDirection: "column"
  },

  displayRow:{
    display: "flex", 
    flexDirection: "row"
  },

  emptySreenContainer: {
    flex: 1, 
    flexGrow: 1, 
    justifyContent: "space-between", 
    alignItems: "center", 
    gap: 30, 
    marginTop: 20
  },

  emptyScreenImageContainer: {
    resizeMode: 'contain', 
    aspectRatio: 1, 
    width: "80%", 
    maxHeight: "80%"
  },

  emptyScreenSubContainer: {
    justifyContent: "space-evenly", 
    alignItems: "center"
  }
});

export default ComponentPresentation;