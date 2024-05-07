import React, { FC, RefObject } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext";
import EditHabitFrequencyScreen from "./EditHabitFrequencyScreen";
import { EditHabitContextProvider } from "./EditHabitContext";
import { SeriazableHabit } from "../../../types/HabitTypes";
import { FormDetailledObjectifHabit } from "../../../types/FormHabitTypes";
import InformationEditFrequencyHabit from "./InformationEditFrequencyHabit";

export type EditHabitFrequencyStackProps = {
    InformationEditFrequencyHabit: {
        habit: SeriazableHabit,
    },

    EditHabitFrequencyScreen: {
        oldHabit: SeriazableHabit,
    },
}

const EditHabitFrequencyStack = createNativeStackNavigator<EditHabitFrequencyStackProps>()

export interface EditHabitFrequencyNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: SeriazableHabit,
    validationAdditionnalMethod: () => void,
    additionnalCloseMethod?: () => void
}

const EditHabitFrequencyNav: FC<EditHabitFrequencyNavProps> = ({
    bottomSheetModalRef, 
    habit, 
    validationAdditionnalMethod, 
    additionnalCloseMethod
}) => {

    return(
            <SimpleFullBottomSheet onDismiss={additionnalCloseMethod } bottomSheetModalRef={bottomSheetModalRef} isPrimary>
                <EditHabitContextProvider validationAdditionnalMethod={(values: FormDetailledObjectifHabit) => {
                    validationAdditionnalMethod()
                }}>
                    <BottomSheetModalProvider>
                        <BottomSheetModalMethodsContextProvider additionnalCloseMethod={additionnalCloseMethod} bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <EditHabitFrequencyStack.Navigator screenOptions={{headerShown: false}} initialRouteName="InformationEditFrequencyHabit">
                                    <EditHabitFrequencyStack.Screen name="InformationEditFrequencyHabit" component={InformationEditFrequencyHabit} initialParams={{ habit }}/>
                                    <EditHabitFrequencyStack.Screen name="EditHabitFrequencyScreen" component={EditHabitFrequencyScreen}/>
                                </EditHabitFrequencyStack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalMethodsContextProvider>
                    </BottomSheetModalProvider>
                </EditHabitContextProvider>
            </SimpleFullBottomSheet>
    )
}

export default EditHabitFrequencyNav