import React, { FC, RefObject } from "react"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { EditObjectifContextProvider } from "./EditObjectifContext"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SeriazableObjectif } from "../../../types/HabitTypes"
import EditObjectifBasicDetailsScreen from "./EditObjectifBasicDetailsScreen"
import EditObjectifColorScreen from "./EditObjectifColorScreen"
import EditObjectifIconScreen from "./EditObjectifIconScreen"
import EditObjectifHabitsScreen from "./EditObjectifHabitsScreen"
import { FormBasicObjectif, FormColoredObjectif, FormDetailledObjectif } from "../../../types/FormObjectifTypes"

export type EditObjectifStackProps = {
    EditObjectifBasicDetailsScreen: {
        objectif: SeriazableObjectif
    },

    EditObjectifColorScreen: {
        newValues: FormBasicObjectif,
        oldObjectif: SeriazableObjectif
    },

    EditObjectifIconScreen: {
        newValues: FormColoredObjectif,
        oldObjectif: SeriazableObjectif
    },

    EditObjectifHabitsScreen: {
        newValues: FormDetailledObjectif,
        oldObjectif: SeriazableObjectif
    },
}

const EditObjectifStack = createStackNavigator<EditObjectifStackProps>()

export interface EditObjectifNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    objectif: SeriazableObjectif,
    validationAdditionnalMethod: () => void
}

const EditObjectifNav: FC<EditObjectifNavProps> = ({bottomSheetModalRef, objectif, validationAdditionnalMethod}) => {
    return(
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} isPrimary>
            <EditObjectifContextProvider validationAdditionnalMethod={validationAdditionnalMethod}>
                <BottomSheetModalProvider>
                    <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                        <NavigationContainer independent>
                            <EditObjectifStack.Navigator screenOptions={{headerShown: false}} initialRouteName="EditObjectifBasicDetailsScreen">
                                <EditObjectifStack.Screen name="EditObjectifBasicDetailsScreen" initialParams={{objectif}} component={EditObjectifBasicDetailsScreen}/>
                                <EditObjectifStack.Screen name="EditObjectifColorScreen" component={EditObjectifColorScreen}/>
                                <EditObjectifStack.Screen name="EditObjectifIconScreen" component={EditObjectifIconScreen}/>
                                <EditObjectifStack.Screen name="EditObjectifHabitsScreen" component={EditObjectifHabitsScreen}/>
                            </EditObjectifStack.Navigator>
                        </NavigationContainer>
                    </BottomSheetModalMethodsContextProvider>
                </BottomSheetModalProvider>
            </EditObjectifContextProvider>
        </SimpleFullBottomSheet>
    )
}

export default EditObjectifNav