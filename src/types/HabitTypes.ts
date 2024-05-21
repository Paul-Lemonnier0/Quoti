import { UserDataBase } from "../firebase/Database_User_Primitives"
import { MemberType } from "./FirestoreTypes/FirestoreHabitTypes"

export enum HabitActivityState {
    Scheduled = "Scheduled",
    Missed = "Missed",
    Done = "Done",
    None = "None"
}

export enum FrequencyTypes {
    Quotidien = "Quotidien",
    Hebdo = "Hebdo",
    Mensuel = "Mensuel",
}

export enum PrioritesType {
    None = "None",
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

export interface StreakValues {
    currentStreak: number,
    lastCompletionDate: string,
    bestStreak: number
}

interface ItemType {
    titre: string,
    description: string,
    color: string,
    icon: string,
}

interface BaseGoal extends ItemType {
    goalID: string
}

interface Goal extends BaseGoal {
    startingDate: Date,
    endingDate?: Date,
}

interface SeriazableGoal extends BaseGoal {
    startingDate: string,
    endingDate?: string,
}

interface BaseHabit extends ItemType, StreakValues {
    habitID: string,
    alertTime?: string,
    frequency: FrequencyTypes,
    occurence: number,
    reccurence: number,
    daysOfWeek: number[],
    notificationEnabled?: boolean,
    goalID: string | undefined
    steps: StepList,
    isShared?: boolean,
    members: (UserDataBase | null)[]
}

interface Habit extends BaseHabit {
    startingDate: Date,
}

interface SeriazableHabit extends BaseHabit {
    startingDate: string,
}

interface Step {
    titre: string,
    description: string,
    duration: number,
    numero: number,
    habitID: string,
    stepID: string,
    created: string,
    deleted?: string,
    isChecked?: boolean,
    priority?: PrioritesType
}

interface HabitList {
    [habitID: string]: Habit
}

interface GoalHabitList {
    [goalID: string]: HabitList
}

interface GoalList {
    [goalID: string]: Goal
}

interface StepList {
    [stepID: string]: Step
}

interface HabitOrGoal {
    Habitudes?: HabitList;
    Goals?: GoalHabitList;
}

interface FilteredHabitsType {
    [FrequencyTypes.Quotidien]: HabitOrGoal;
    [FrequencyTypes.Hebdo]: HabitOrGoal;
    [FrequencyTypes.Mensuel]: HabitOrGoal;
}

export const EMPTY_FILTERED_HABITS = {
    Quotidien: {Habitudes: {}, Goals: {}}, 
    Hebdo: {Habitudes: {}, Goals: {}}, 
    Mensuel: {Habitudes: {}, Goals: {}}
}


export {
    Goal, 
    SeriazableGoal, 
    Habit, 
    SeriazableHabit, 
    Step, 
    HabitList, 
    GoalList, 
    StepList, 
    FilteredHabitsType
}