import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PreAddScreen } from "../screens/AddScreen/PreAddScreen"
import { AddBasicDetails } from "../screens/AddScreen/Habit/AddBasicDetails"
import AddHabitSteps from "../screens/AddScreen/Habit/AddHabitSteps"
import CreateHabitDetails from "../screens/AddScreen/Habit/CreateHabitDetails"
import { ChooseIconScreen } from "../screens/AddScreen/Habit/ChooseIconScreen"
import { ChooseColorScreen } from "../screens/AddScreen/Habit/ChooseColorScreen"
import ValidationScreenHabit from "../screens/AddScreen/Habit/ValidationScreenHabit"
import AddBasicDetailsObjectif from "../screens/AddScreen/Objectif/AddBasicDetailsObjectif"
import AddHabitsToObjectif from "../screens/AddScreen/Objectif/AddHabitsToObjectif"
import { ChooseColorScreenObjectif } from "../screens/AddScreen/Objectif/ChooseColorScreenObjectif"
import { ChooseIconScreenObjectif } from "../screens/AddScreen/Objectif/ChooseIconScreenObjectif"
import ValidationScreenObjectif from "../screens/AddScreen/Objectif/ValidationScreenObjectif"
import { FormBasicObjectif, FormColoredObjectif, FormDetailledObjectif } from "../types/FormObjectifTypes"
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

    AddBasicDetailsObjectif: undefined,

    ChooseColorScreenObjectif: {
        objectif: FormBasicObjectif
    },
    ChooseIconScreenObjectif: {
        objectif: FormColoredObjectif
    },
    AddHabitsToObjectif: {
        objectif: FormDetailledObjectif
    },

    ValidationScreenObjectif: undefined,
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

        <AddScreenStack.Screen name="AddBasicDetailsObjectif" component={AddBasicDetailsObjectif}/>   
        <AddScreenStack.Screen name="AddHabitsToObjectif" component={AddHabitsToObjectif}/>   
        <AddScreenStack.Screen name="ChooseColorScreenObjectif" component={ChooseColorScreenObjectif}/>   
        <AddScreenStack.Screen name="ChooseIconScreenObjectif" component={ChooseIconScreenObjectif}/>   
        <AddScreenStack.Screen name="ValidationScreenObjectif" component={ValidationScreenObjectif}/>   

        </AddScreenStack.Navigator>
    );
}

export default AddScreenNavigator