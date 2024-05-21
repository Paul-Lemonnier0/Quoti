import React, { FC, RefObject } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext";
import EditHabitDetailsScreen from "./EditHabitDetailsScreen";
import EditColorHabitScreen from "./EditColorHabitScreen";
import EditIconHabitScreen from "./EditIconHabitScreen";
import EditHabitAdvancedDetailsScreen from "./EditHabitAdvancedDetailsScreen";
import EditHabitStepsScreen from "./EditHabitStepsScreen";
import { EditHabitContextProvider } from "./EditHabitContext";
import { Habit, SeriazableHabit } from "../../../types/HabitTypes";
import { FormBasicHabit, FormColoredHabit, FormDetailledHabit, FormDetailledGoalHabit, FormIconedHabit, FormStepsHabit } from "../../../types/FormHabitTypes";
import { View } from "react-native";

export type EditHabitStackProps = {
    EditHabitDetailsScreen: {
        habit: (SeriazableHabit | FormDetailledGoalHabit),
        isNewGoalHabit?: boolean,
        constGoalID?: string,
        goalColor?: string
    },

    EditColorHabitScreen: {
        newValues:  FormBasicHabit,
        oldHabit: (SeriazableHabit | FormDetailledGoalHabit),
        isNewGoalHabit?: boolean
    },

    EditIconHabitScreen: {
        newValues:  FormColoredHabit,
        oldHabit: (SeriazableHabit | FormDetailledGoalHabit),
        isNewGoalHabit?: boolean
    },

    EditHabitStepsScreen: {
        newValues:  FormIconedHabit,
        oldHabit: (SeriazableHabit | FormDetailledGoalHabit),
        isNewGoalHabit?: boolean
    },

    EditHabitAdvancedDetailsScreen: {
        newValues:  FormStepsHabit,
        oldHabit: (SeriazableHabit | FormDetailledGoalHabit),
        isNewGoalHabit?: boolean
    },
}

const EditHabitStack = createNativeStackNavigator<EditHabitStackProps>()

export interface EditHabitNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: (SeriazableHabit | FormDetailledGoalHabit),
    validationAdditionnalMethod: () => void,
    editHabitCustomMethod: (values: FormDetailledGoalHabit) => void,
    isNewGoalHabit?: boolean,
    goalColor?: string,
    constGoalID?: string,
    additionnalCloseMethod?: () => void
}

const EditHabitNav: FC<EditHabitNavProps> = ({
    bottomSheetModalRef, 
    habit, 
    validationAdditionnalMethod, 
    editHabitCustomMethod, 
    isNewGoalHabit, 
    goalColor, 
    constGoalID,
    additionnalCloseMethod
}) => {

    return(
            <SimpleFullBottomSheet onDismiss={additionnalCloseMethod} bottomSheetModalRef={bottomSheetModalRef} isPrimary>
                <EditHabitContextProvider validationAdditionnalMethod={(values?: FormDetailledGoalHabit) => {
                    validationAdditionnalMethod()
                    values ? editHabitCustomMethod(values) : null
                }}>
                    <BottomSheetModalProvider>
                        <BottomSheetModalMethodsContextProvider additionnalCloseMethod={additionnalCloseMethod} bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <EditHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="EditHabitDetailsScreen">
                                    <EditHabitStack.Screen name="EditHabitDetailsScreen" component={EditHabitDetailsScreen} initialParams={{
                                        habit, 
                                        isNewGoalHabit, 
                                        goalColor,
                                        constGoalID
                                    }}/>
                                    <EditHabitStack.Screen name="EditColorHabitScreen" component={EditColorHabitScreen}/>
                                    <EditHabitStack.Screen name="EditIconHabitScreen" component={EditIconHabitScreen}/>
                                    <EditHabitStack.Screen name="EditHabitStepsScreen" component={EditHabitStepsScreen}/>
                                    <EditHabitStack.Screen name="EditHabitAdvancedDetailsScreen" component={EditHabitAdvancedDetailsScreen}/>
                                </EditHabitStack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalMethodsContextProvider>
                    </BottomSheetModalProvider>
                </EditHabitContextProvider>
            </SimpleFullBottomSheet>
    )
}

export default EditHabitNav