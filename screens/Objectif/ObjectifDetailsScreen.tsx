import React, { useState, useEffect, useContext, FC } from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { CustomScrollView, UsualScreen } from "../../components/View/Views";
import { NavigationButton } from "../../components/Buttons/IconButtons";
import {HugeText, NormalGrayText, TitleText} from "../../styles/StyledText";
import HabitudesList from "../../components/Habitudes/HabitudesList";
import ProgressBar from "../../components/Progress/ProgressBar";
import { useThemeColor } from "../../components/Themed";
import { HabitsContext } from "../../data/HabitContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator";
import { Habit } from "../../types/HabitTypes";

type ObjectifDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ObjectifDetailsScreen">

const ObjectifDetailsScreen: FC<ObjectifDetailsScreenProps> = ({route, navigation}) => {

  const secondary = useThemeColor({}, "Secondary");
  const { filteredHabitsByDate } = useContext(HabitsContext);
  const { seriazableObjectif, frequency, currentDateString } = route.params;

  const [isObjectifValid, setIsObjectifValid] = useState(false);
  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>([]);

  useEffect(() => {
    let isMounted = true;

    const validateObjectif = async () => {
      if (seriazableObjectif?.objectifID) {
        const isObjectifVide =
            !filteredHabitsByDate[frequency]?.Objectifs?.hasOwnProperty(seriazableObjectif.objectifID);

        if (frequency === undefined || frequency === null || isObjectifVide) {
          if (isMounted) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              })
            );
          }

          setIsObjectifValid(false);
        } 
        
        else setIsObjectifValid(true);
      } 
      
      else {
        if (isMounted)
          navigation.goBack();
        
        setIsObjectifValid(false);
      }
    };

    validateObjectif();

    return () => {
      isMounted = false;
    };
  }, [navigation, seriazableObjectif, frequency, filteredHabitsByDate]);

  const objectif = seriazableObjectif || {};

  useEffect(() => {
    if (seriazableObjectif?.objectifID && filteredHabitsByDate[frequency]?.Objectifs?.hasOwnProperty(seriazableObjectif.objectifID)) {

      const habits_temp = Object.values(
        filteredHabitsByDate[frequency]?.Objectifs?.[seriazableObjectif.objectifID] ?? {}
      )

      setDisplayedHabits(habits_temp.map((habit) => ({...habit, color: objectif.color})));
    }
  }, [seriazableObjectif, filteredHabitsByDate]);

  const currentDate = new Date(currentDateString);

  const steps = displayedHabits.flatMap((habit) =>
    Object.values(habit.steps)
  );

  const doneSteps = steps.filter((step) => step.isChecked).length;
  const totalSteps = steps.length;
  const pourcentage_value = (doneSteps * 100) / totalSteps;

  const handlePressOnHabit = (habitude: Habit, objectifID: string | undefined, currentDateString: string) => {
    navigation.navigate("HabitudeScreen", {habitID: habitude.habitID, habitFrequency: habitude.frequency, objectifID, currentDateString})    
  }

  return (
    <UsualScreen>
      {isObjectifValid ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.subHeader}>
              <NavigationButton action={"goBack"} />
              <View></View>
            </View>
          </View>

          <CustomScrollView>
            <View style={styles.body}>
              <View style={styles.bodyHeader}>
                <View>
                  <HugeText text={objectif.titre} />
                  <NormalGrayText text={objectif.description} />
                </View>

                <ProgressBar
                  progress={pourcentage_value / 100}
                  color={objectif.color}
                  inactiveColor={secondary}
                  withPourcentage
                />
              </View>

              <View>
                <TitleText text="Habitudes" />
              </View>

              <View style={{ flex: 1 }}>
                <HabitudesList habits={displayedHabits} currentDateString={currentDateString} handleOnPress={handlePressOnHabit}/>
              </View>
            </View>
          </CustomScrollView>
        </View>
      ) : (
        <View />
      )}
    </UsualScreen>
  );
};

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
});

export default ObjectifDetailsScreen
