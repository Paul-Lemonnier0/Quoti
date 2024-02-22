import * as ImageManipulator from 'expo-image-manipulator';

export enum AddHabitScreenType {
    PreAddScreen = "PreAddScreen",
    AddBasicDetails = "AddBasicDetails",
    ChooseColorScreen = "ChooseColorScreen",
    ChooseIconScreen = "ChooseIconScreen",
    AddHabitSteps = "AddHabitSteps",
    CreateHabitDetails = "CreateHabitDetails"
}

const ADD_HABIT_WITHOUT_ASSOCIATED_OBJ_STEP_ORDER: AddHabitScreenType[] = [AddHabitScreenType.PreAddScreen, AddHabitScreenType.AddBasicDetails, AddHabitScreenType.ChooseColorScreen, AddHabitScreenType.ChooseIconScreen, AddHabitScreenType.AddHabitSteps, AddHabitScreenType.CreateHabitDetails]
const ADD_HABIT_WITH_ASSOCIATED_OBJ_STEP_ORDER: AddHabitScreenType[] = [AddHabitScreenType.PreAddScreen, AddHabitScreenType.AddBasicDetails, AddHabitScreenType.ChooseIconScreen, AddHabitScreenType.AddHabitSteps, AddHabitScreenType.CreateHabitDetails]

export function getAddHabitStepsDetails(objectifID: string | null, currentScreen: AddHabitScreenType){

    return objectifID === null || objectifID === undefined ?
        {
            TOTAL_STEPS: ADD_HABIT_WITHOUT_ASSOCIATED_OBJ_STEP_ORDER.length,
            CURRENT_STEP: ADD_HABIT_WITHOUT_ASSOCIATED_OBJ_STEP_ORDER.indexOf(currentScreen)
        }

        :

        {
            TOTAL_STEPS: ADD_HABIT_WITH_ASSOCIATED_OBJ_STEP_ORDER.length,
            CURRENT_STEP: ADD_HABIT_WITH_ASSOCIATED_OBJ_STEP_ORDER.indexOf(currentScreen)
        }
}

const IMAGE_DIMENSIONS = {width: 320, height: 320}          
const IMAGE_FORMAT = ImageManipulator.SaveFormat.JPEG       
const IMAGE_COMPRESSION = 0.5   

export {IMAGE_COMPRESSION, IMAGE_DIMENSIONS, IMAGE_FORMAT}