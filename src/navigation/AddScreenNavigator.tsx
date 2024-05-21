import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PreAddScreen } from "../screens/AddScreen/PreAddScreen"
import { AddBasicDetails } from "../screens/AddScreen/Habit/AddBasicDetails"
import AddHabitSteps from "../screens/AddScreen/Habit/AddHabitSteps"
import CreateHabitDetails from "../screens/AddScreen/Habit/CreateHabitDetails"
import { ChooseIconScreen } from "../screens/AddScreen/Habit/ChooseIconScreen"
import { ChooseColorScreen } from "../screens/AddScreen/Habit/ChooseColorScreen"
import ValidationScreenHabit from "../screens/AddScreen/Habit/ValidationScreenHabit"
import AddBasicDetailsGoal from "../screens/AddScreen/Goal/AddBasicDetailsGoal"
import AddHabitsToGoal from "../screens/AddScreen/Goal/AddHabitsToGoal"
import { ChooseColorScreenGoal } from "../screens/AddScreen/Goal/ChooseColorScreenGoal"
import { ChooseIconScreenGoal } from "../screens/AddScreen/Goal/ChooseIconScreenGoal"
import ValidationScreenGoal from "../screens/AddScreen/Goal/ValidationScreenGoal"
import { FormBasicGoal, FormColoredGoal, FormDetailledGoal } from "../types/FormGoalTypes"
import { SeriazableHabit } from "../types/HabitTypes"
import { FormBasicHabit, FormColoredHabit, FormIconedHabit, FormStepsHabit } from "../types/FormHabitTypes"
import React from "react"

export type AddScreenStackType  = {
    Home: undefined,

    PreAddScreen: undefined,

    AddBasicDetails: undefined,

    ChooseColorScreen: {
        habit: FormBasicHabit
    },
    ChooseIconScreen: {
        habit: FormColoredHabit
    },
    AddHabitSteps: {
        habit: FormIconedHabit
    },
    CreateHabitDetails: {
        habit: FormStepsHabit
    },
    ValidationScreenHabit: {
        habit: SeriazableHabit
    },

    AddBasicDetailsGoal: undefined,

    ChooseColorScreenGoal: {
        goal: FormBasicGoal
    },
    ChooseIconScreenGoal: {
        goal: FormColoredGoal
    },
    AddHabitsToGoal: {
        goal: FormDetailledGoal
    },

    ValidationScreenGoal: undefined,
}
  
const AddScreenStack = createNativeStackNavigator<AddScreenStackType>();
  
function AddScreenNavigator() {
    return (
        <AddScreenStack.Navigator screenOptions={{ headerShown: false }}>

        <AddScreenStack.Screen name="PreAddScreen" component={PreAddScreen}/>   

        <AddScreenStack.Screen name="AddBasicDetails" component={AddBasicDetails}/>   
        <AddScreenStack.Screen name="AddHabitSteps" component={AddHabitSteps}/>   
        <AddScreenStack.Screen name="CreateHabitDetails" component={CreateHabitDetails}/>   
        <AddScreenStack.Screen name="ChooseIconScreen" component={ChooseIconScreen}/>   
        <AddScreenStack.Screen name="ChooseColorScreen" component={ChooseColorScreen}/>   
        <AddScreenStack.Screen name="ValidationScreenHabit" component={ValidationScreenHabit}/>   

        <AddScreenStack.Screen name="AddBasicDetailsGoal" component={AddBasicDetailsGoal}/>   
        <AddScreenStack.Screen name="AddHabitsToGoal" component={AddHabitsToGoal}/>   
        <AddScreenStack.Screen name="ChooseColorScreenGoal" component={ChooseColorScreenGoal}/>   
        <AddScreenStack.Screen name="ChooseIconScreenGoal" component={ChooseIconScreenGoal}/>   
        <AddScreenStack.Screen name="ValidationScreenGoal" component={ValidationScreenGoal}/>   

        </AddScreenStack.Navigator>
    );
}

export default AddScreenNavigator