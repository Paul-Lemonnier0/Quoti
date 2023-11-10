import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddBasicDetailsHabitObjectif } from "./AddBasicDetailsHabitObjectif"
import { CreateObjectifHabitDetails } from "./CreateObjectifHabitDetails"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

export const AddHabitToObjContext = createContext();

export const AddHabitToObjProvider = ({addHabitForObjectif, bottomSheetModalRef, children}) => {

    const closeModal = () => bottomSheetModalRef.current?.close()
    
    return(
        <AddHabitToObjContext.Provider value={{addHabitForObjectif, closeModal}}>
            {children}
        </AddHabitToObjContext.Provider>
    )
}

const AddHabitStack = createNativeStackNavigator()

export default AddHabitToObjectifNav = ({bottomSheetModalRef, snapPoints, handleSheetChanges, addHabitForObjectif}) => {


    return(
            <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={handleSheetChanges}>
                <BottomSheetModalProvider>
                    <View style={{flex: 1, marginTop: 0, paddingTop: -30, marginBottom: -30}}>
                    <AddHabitToObjProvider addHabitForObjectif={addHabitForObjectif} bottomSheetModalRef={bottomSheetModalRef}>
                        <NavigationContainer independent>
                            <AddHabitStack.Navigator screenOptions={{headerShown: false}} initialRouteName="AddBasicsHabitDetailsObj">
                                <AddHabitStack.Screen name="AddBasicsHabitDetailsObj" component={AddBasicDetailsHabitObjectif}/>
                                <AddHabitStack.Screen name="CreateObjectifHabitDetails" component={CreateObjectifHabitDetails}/>
                            </AddHabitStack.Navigator>
                        </NavigationContainer>
                    </AddHabitToObjProvider>
                    </View>
                </BottomSheetModalProvider>
            </SimpleFullBottomSheet>
    )
}