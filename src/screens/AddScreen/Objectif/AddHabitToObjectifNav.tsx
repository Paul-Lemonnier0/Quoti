import React, { FC, RefObject } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddBasicDetailsHabitObjectif } from "./AddBasicDetailsHabitObjectif"
import { CreateObjectifHabitDetails } from "./CreateObjectifHabitDetails"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { AddHabitToObjProvider } from "./AddHabitToObjContext";
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext";
import { FormBasicHabit, FormDetailledHabit, FormIconedHabit, FormStepsHabit } from "../../../types/FormHabitTypes";
import AddHabitStepsObj from "./AddHabitStepsObj";

export type AddHabitToObjectifStackType = {
    AddBasicsHabitDetailsObj: {
        color: string,
        icon: string
    },
    AddHabitStepsObj: {
        habit: FormIconedHabit
    },
    CreateObjectifHabitDetails: {
        habit: FormStepsHabit
    },
}

const AddHabitStack = createNativeStackNavigator<AddHabitToObjectifStackType>()

export interface AddHabitToObjectifNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    addHabitForObjectif: (habit: FormDetailledHabit) => void,
    color: string,
    icon: string
}

const AddHabitToObjectifNav: FC<AddHabitToObjectifNavProps> = ({bottomSheetModalRef, addHabitForObjectif, color, icon}) => {
    return(
            <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <BottomSheetModalProvider>
                    <AddHabitToObjProvider addHabitForObjectif={addHabitForObjectif}>
                        <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <AddHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="AddBasicsHabitDetailsObj">
                                    <AddHabitStack.Screen name="AddBasicsHabitDetailsObj" component={AddBasicDetailsHabitObjectif} initialParams={{color, icon}}/>
                                    <AddHabitStack.Screen name="AddHabitStepsObj" component={AddHabitStepsObj}/>
                                    <AddHabitStack.Screen name="CreateObjectifHabitDetails" component={CreateObjectifHabitDetails}/>
                                </AddHabitStack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalMethodsContextProvider>
                    </AddHabitToObjProvider>
                </BottomSheetModalProvider>
            </SimpleFullBottomSheet>
    )
}

export default AddHabitToObjectifNav