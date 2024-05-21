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
import { FormBasicHabit, FormColoredHabit, FormDetailledHabit, FormDetailledObjectifHabit, FormIconedHabit, FormStepsHabit } from "../../../types/FormHabitTypes";
import { View } from "react-native";

export type EditHabitStackProps = {
    EditHabitDetailsScreen: {
        habit: (SeriazableHabit | FormDetailledObjectifHabit),
        isNewObjectifHabit?: boolean,
        constObjectifID?: string,
        objectifColor?: string
    },

    EditColorHabitScreen: {
        newValues:  FormBasicHabit,
        oldHabit: (SeriazableHabit | FormDetailledObjectifHabit),
        isNewObjectifHabit?: boolean
    },

    EditIconHabitScreen: {
        newValues:  FormColoredHabit,
        oldHabit: (SeriazableHabit | FormDetailledObjectifHabit),
        isNewObjectifHabit?: boolean
    },

    EditHabitStepsScreen: {
        newValues:  FormIconedHabit,
        oldHabit: (SeriazableHabit | FormDetailledObjectifHabit),
        isNewObjectifHabit?: boolean
    },

    EditHabitAdvancedDetailsScreen: {
        newValues:  FormStepsHabit,
        oldHabit: (SeriazableHabit | FormDetailledObjectifHabit),
        isNewObjectifHabit?: boolean
    },
}

const EditHabitStack = createNativeStackNavigator<EditHabitStackProps>()

export interface EditHabitNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: (SeriazableHabit | FormDetailledObjectifHabit),
    validationAdditionnalMethod: () => void,
    editHabitCustomMethod: (values: FormDetailledObjectifHabit) => void,
    isNewObjectifHabit?: boolean,
    objectifColor?: string,
    constObjectifID?: string,
    additionnalCloseMethod?: () => void
}

const EditHabitNav: FC<EditHabitNavProps> = ({
    bottomSheetModalRef, 
    habit, 
    validationAdditionnalMethod, 
    editHabitCustomMethod, 
    isNewObjectifHabit, 
    objectifColor, 
    constObjectifID,
    additionnalCloseMethod
}) => {

    return(
            <SimpleFullBottomSheet onDismiss={additionnalCloseMethod} bottomSheetModalRef={bottomSheetModalRef} isPrimary>
                <EditHabitContextProvider validationAdditionnalMethod={(values?: FormDetailledObjectifHabit) => {
                    validationAdditionnalMethod()
                    values ? editHabitCustomMethod(values) : null
                }}>
                    <BottomSheetModalProvider>
                        <BottomSheetModalMethodsContextProvider additionnalCloseMethod={additionnalCloseMethod} bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <EditHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="EditHabitDetailsScreen">
                                    <EditHabitStack.Screen name="EditHabitDetailsScreen" component={EditHabitDetailsScreen} initialParams={{
                                        habit, 
                                        isNewObjectifHabit, 
                                        objectifColor,
                                        constObjectifID
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