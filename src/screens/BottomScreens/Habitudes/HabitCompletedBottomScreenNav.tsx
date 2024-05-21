import React, { FC, RefObject } from 'react'
import SimpleFullBottomSheet from '../../../components/BottomSheets/SimpleFullBottomSheet'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Habit, SeriazableHabit } from '../../../types/HabitTypes'
import { HomeStackParamsList } from '../../../navigation/HomeNavigator'
import { BottomSheetModalMethodsContextProvider } from '../../../data/BottomSheetModalContext'
import { NavigationContainer } from '@react-navigation/native'
import HabitCompletedBottomScreen from './HabitCompletedBottomScreen'
import { getSeriazableHabit } from '../../../primitives/HabitMethods'
import PostHabitScreen from '../Social/PostHabitBottomScreen'

export type HabitCompletedBottomScreenStackProps = {
    HabitCompletedBottomScreen: {
        habit: SeriazableHabit,
    },

    PostCompletedHabitScreen: {
        habit: SeriazableHabit,
    }
}

const HabitCompletedBottomScreenStack = createNativeStackNavigator<HabitCompletedBottomScreenStackProps>()

export interface HabitCompletedBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: SeriazableHabit,
    goBackHome?: () => void,
}

const HabitCompletedBottomScreenNav: FC<HabitCompletedBottomScreenProps> = ({
    bottomSheetModalRef,
    habit,
    goBackHome,
}) => {

    return (
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} isPrimary>
            <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef}>
                <NavigationContainer independent>
                    <HabitCompletedBottomScreenStack.Navigator screenOptions={{headerShown: false}} initialRouteName='HabitCompletedBottomScreen'>
                        <HabitCompletedBottomScreenStack.Screen 
                            name="HabitCompletedBottomScreen" 
                            component={HabitCompletedBottomScreen}
                            initialParams={{habit}}/>
                        <HabitCompletedBottomScreenStack.Screen name="PostCompletedHabitScreen" component={PostHabitScreen}/>
                    </HabitCompletedBottomScreenStack.Navigator>
                </NavigationContainer>
            </BottomSheetModalMethodsContextProvider>
        </SimpleFullBottomSheet>

    )
}

export default HabitCompletedBottomScreenNav