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
import { SeriazableHabit } from "../../../types/HabitTypes";
import { FormBasicHabit, FormColoredHabit, FormDetailledHabit, FormIconedHabit, FormStepsHabit } from "../../../types/FormHabitTypes";

export type EditHabitStackProps = {
    EditHabitDetailsScreen: {
        habit: SeriazableHabit
    },

    EditColorHabitScreen: {
        newValues:  FormBasicHabit,
        oldHabit: SeriazableHabit
    },

    EditIconHabitScreen: {
        newValues:  FormColoredHabit,
        oldHabit: SeriazableHabit
    },

    EditHabitStepsScreen: {
        newValues:  FormIconedHabit,
        oldHabit: SeriazableHabit
    },

    EditHabitAdvancedDetailsScreen: {
        newValues:  FormStepsHabit,
        oldHabit: SeriazableHabit
    },
}

const EditHabitStack = createNativeStackNavigator<EditHabitStackProps>()

interface EditHabitNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: SeriazableHabit,
    validationAdditionnalMethod: () => void
}

const EditHabitNav: FC<EditHabitNavProps> = ({bottomSheetModalRef, habit, validationAdditionnalMethod}) => {

    return(
            <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <EditHabitContextProvider validationAdditionnalMethod={validationAdditionnalMethod}>
                    <BottomSheetModalProvider>
                        <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <EditHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="EditHabitDetailsScreen">
                                    <EditHabitStack.Screen name="EditHabitDetailsScreen" component={EditHabitDetailsScreen} initialParams={{habit}}/>
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