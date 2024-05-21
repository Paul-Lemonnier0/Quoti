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

export function getAddHabitStepsDetails(goalID: string | null, currentScreen: AddHabitScreenType){

    return goalID === null || goalID === undefined ?
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

export enum AddGoalScreenType {
    PreAddScreen = "PreAddScreen",
    AddBasicGoalDetails = "AddBasicGoalDetails",
    ChooseColorScreenGoal = "ChooseColorScreenGoal",
    ChooseIconScreenGoal = "ChooseIconScreenGoal",
    AddHabitsToGoal = "AddHabitsToGoal"
}

const ADD_GOAL_STEP_ORDER: AddGoalScreenType[] = [AddGoalScreenType.PreAddScreen, AddGoalScreenType.AddBasicGoalDetails, AddGoalScreenType.ChooseColorScreenGoal, AddGoalScreenType.ChooseIconScreenGoal, AddGoalScreenType.AddHabitsToGoal]

export function getAddGoalStepsDetails(currentScreen: AddGoalScreenType){

    return {
            TOTAL_STEPS: ADD_GOAL_STEP_ORDER.length,
            CURRENT_STEP: ADD_GOAL_STEP_ORDER.indexOf(currentScreen)
        }
}

const IMAGE_DIMENSIONS = {width: 320, height: 320}          
const IMAGE_FORMAT = ImageManipulator.SaveFormat.JPEG       
const IMAGE_COMPRESSION = 0.5   

export {IMAGE_COMPRESSION, IMAGE_DIMENSIONS, IMAGE_FORMAT}