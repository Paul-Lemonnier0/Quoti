import React, { FC, RefObject } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CreateGoalHabitDetails } from "./CreateGoalHabitDetails"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { AddHabitToGoalProvider } from "./AddHabitToGoalContext";
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext";
import { FormColoredHabit, FormDetailledHabit, FormIconedHabit, FormStepsHabit } from "../../../types/FormHabitTypes";
import { AddGoalHabitSteps } from "./AddGoalHabitSteps";
import { ChooseGoalHabitIcon } from "./ChooseGoalHabitIcon";
import { AddBasicsGoalHabitDetails } from "./AddBasicsGoalHabitDetails";

export type AddHabitToGoalStackType = {
    AddBasicsGoalHabitDetails: {
        color: string,
        goalID?: string
    },
    ChooseGoalHabitIcon: {
        habit: FormColoredHabit
    },
    AddGoalHabitSteps: {
        habit: FormIconedHabit
    },
    CreateGoalHabitDetails: {
        habit: FormStepsHabit
    },
}

const AddHabitStack = createNativeStackNavigator<AddHabitToGoalStackType>()

export interface AddHabitToGoalNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    addHabitForGoal: (habit: FormDetailledHabit) => void,
    color: string,
    goalID?: string
}

const AddHabitToGoalNav: FC<AddHabitToGoalNavProps> = ({bottomSheetModalRef, addHabitForGoal, color, goalID}) => {
    return(
            <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} isPrimary>
                <BottomSheetModalProvider>
                    <AddHabitToGoalProvider addHabitForGoal={addHabitForGoal}>
                        <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <AddHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="AddBasicsGoalHabitDetails">
                                    <AddHabitStack.Screen name="AddBasicsGoalHabitDetails" component={AddBasicsGoalHabitDetails} initialParams={{color, goalID}}/>
                                    <AddHabitStack.Screen name="ChooseGoalHabitIcon" component={ChooseGoalHabitIcon}/>
                                    <AddHabitStack.Screen name="AddGoalHabitSteps" component={AddGoalHabitSteps}/>
                                    <AddHabitStack.Screen name="CreateGoalHabitDetails" component={CreateGoalHabitDetails}/>
                                </AddHabitStack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalMethodsContextProvider>
                    </AddHabitToGoalProvider>
                </BottomSheetModalProvider>
            </SimpleFullBottomSheet>
    )
}

export default AddHabitToGoalNav