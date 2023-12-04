import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddBasicDetailsHabitObjectif } from "./AddBasicDetailsHabitObjectif"
import { CreateObjectifHabitDetails } from "./CreateObjectifHabitDetails"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { StyleSheet, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import Separator from "../../../components/Other/Separator";
import { TextButton } from "../../../components/Buttons/UsualButton";
import { AddHabitToObjProvider } from "./AddHabitToObjContext";
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext";


const AddHabitStack = createNativeStackNavigator()

export default AddHabitToObjectifNav = ({bottomSheetModalRef, snapPoints, handleSheetChanges, addHabitForObjectif}) => {


    return(
            <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={handleSheetChanges}>
                <BottomSheetModalProvider>
                    <AddHabitToObjProvider addHabitForObjectif={addHabitForObjectif}>
                        <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                            <NavigationContainer independent>
                                <AddHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="AddBasicsHabitDetailsObj">
                                    <AddHabitStack.Screen name="AddBasicsHabitDetailsObj" component={AddBasicDetailsHabitObjectif}/>
                                    <AddHabitStack.Screen name="CreateObjectifHabitDetails" component={CreateObjectifHabitDetails}/>
                                </AddHabitStack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalMethodsContextProvider>
                    </AddHabitToObjProvider>
                </BottomSheetModalProvider>
            </SimpleFullBottomSheet>
    )
}