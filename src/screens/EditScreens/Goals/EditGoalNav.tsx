import React, { FC, RefObject } from "react"
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { EditGoalContextProvider } from "./EditGoalContext"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethodsContextProvider } from "../../../data/BottomSheetModalContext"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SeriazableGoal } from "../../../types/HabitTypes"
import EditGoalBasicDetailsScreen from "./EditGoalBasicDetailsScreen"
import EditGoalColorScreen from "./EditGoalColorScreen"
import EditGoalIconScreen from "./EditGoalIconScreen"
import EditGoalHabitsScreen from "./EditGoalHabitsScreen"
import { FormBasicGoal, FormColoredGoal, FormDetailledGoal } from "../../../types/FormGoalTypes"

export type EditGoalStackProps = {
    EditGoalBasicDetailsScreen: {
        goal: SeriazableGoal
    },

    EditGoalColorScreen: {
        newValues: FormBasicGoal,
        oldGoal: SeriazableGoal
    },

    EditGoalIconScreen: {
        newValues: FormColoredGoal,
        oldGoal: SeriazableGoal
    },

    EditGoalHabitsScreen: {
        newValues: FormDetailledGoal,
        oldGoal: SeriazableGoal
    },
}

const EditGoalStack = createStackNavigator<EditGoalStackProps>()

export interface EditGoalNavProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    goal: SeriazableGoal,
    validationAdditionnalMethod: () => void
}

const EditGoalNav: FC<EditGoalNavProps> = ({bottomSheetModalRef, goal, validationAdditionnalMethod}) => {
    return(
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} isPrimary>
            <EditGoalContextProvider validationAdditionnalMethod={validationAdditionnalMethod}>
                <BottomSheetModalProvider>
                    <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                        <NavigationContainer independent>
                            <EditGoalStack.Navigator screenOptions={{headerShown: false}} initialRouteName="EditGoalBasicDetailsScreen">
                                <EditGoalStack.Screen name="EditGoalBasicDetailsScreen" initialParams={{goal}} component={EditGoalBasicDetailsScreen}/>
                                <EditGoalStack.Screen name="EditGoalColorScreen" component={EditGoalColorScreen}/>
                                <EditGoalStack.Screen name="EditGoalIconScreen" component={EditGoalIconScreen}/>
                                <EditGoalStack.Screen name="EditGoalHabitsScreen" component={EditGoalHabitsScreen}/>
                            </EditGoalStack.Navigator>
                        </NavigationContainer>
                    </BottomSheetModalMethodsContextProvider>
                </BottomSheetModalProvider>
            </EditGoalContextProvider>
        </SimpleFullBottomSheet>
    )
}

export default EditGoalNav