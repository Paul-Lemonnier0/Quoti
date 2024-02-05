import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext";
import EditHabitDetailsScreen from "./EditHabitDetailsScreen";
import EditColorHabitScreen from "./EditColorHabitScreen";
import EditIconHabitScreen from "./EditIconHabitScreen";
import EditHabitAdvancedDetailsScreen from "./EditHabitAdvancedDetailsScreen";
import EditHabitStepsScreen from "./EditHabitStepsScreen";
import { EditHabitContextProvider } from "./EditHabitContext";

const EditHabitSnack = createNativeStackNavigator()

export default EditHabitNav = ({bottomSheetModalRef, habit, validationAdditionnalMethod}) => {

    return(
            <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <EditHabitContextProvider validationAdditionnalMethod={validationAdditionnalMethod}>
                    <BottomSheetModalProvider>
                        <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <EditHabitSnack.Navigator screenOptions={{headerShown: false}} initialRouteName="EditHabitDetailsScreen">
                                    <EditHabitSnack.Screen name="EditHabitDetailsScreen" component={EditHabitDetailsScreen} initialParams={{habit}}/>
                                    <EditHabitSnack.Screen name="EditColorHabitScreen" component={EditColorHabitScreen}/>
                                    <EditHabitSnack.Screen name="EditIconHabitScreen" component={EditIconHabitScreen}/>
                                    <EditHabitSnack.Screen name="EditHabitStepsScreen" component={EditHabitStepsScreen}/>
                                    <EditHabitSnack.Screen name="EditHabitAdvancedDetailsScreen" component={EditHabitAdvancedDetailsScreen}/>
                                </EditHabitSnack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalMethodsContextProvider>
                    </BottomSheetModalProvider>
                </EditHabitContextProvider>
            </SimpleFullBottomSheet>
    )
}