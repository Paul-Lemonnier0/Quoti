import * as ImageManipulator from 'expo-image-manipulator';

const ADD_HABIT_WITHOUT_ASSOCIATED_OBJ_STEP_ORDER = ["PreAddScreen", "AddBasicDetails", "ChooseColorScreen", "ChooseIconScreen", "AddHabitSteps", "CreateHabitDetails"]
const ADD_HABIT_WITH_ASSOCIATED_OBJ_STEP_ORDER = ["PreAddScreen", "AddBasicDetails", "ChooseIconScreen", "AddHabitSteps", "CreateHabitDetails"]

export function getAddHabitStepsDetails(objectifID, currentScreen){

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