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

interface BaseObjectif extends ItemType {
    objectifID: string
}

interface Objectif extends BaseObjectif {
    startingDate: Date,
    endingDate?: Date,
}

interface SeriazableObjectif extends BaseObjectif {
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
    objectifID: string | undefined
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

interface ObjectifHabitList {
    [objectifID: string]: HabitList
}

interface ObjectifList {
    [objectifID: string]: Objectif
}

interface StepList {
    [stepID: string]: Step
}

interface HabitOrObjectif {
    Habitudes?: HabitList;
    Objectifs?: ObjectifHabitList;
}

interface FilteredHabitsType {
    [FrequencyTypes.Quotidien]: HabitOrObjectif;
    [FrequencyTypes.Hebdo]: HabitOrObjectif;
    [FrequencyTypes.Mensuel]: HabitOrObjectif;
}

export const EMPTY_FILTERED_HABITS = {
    Quotidien: {Habitudes: {}, Objectifs: {}}, 
    Hebdo: {Habitudes: {}, Objectifs: {}}, 
    Mensuel: {Habitudes: {}, Objectifs: {}}
}


export {
    Objectif, 
    SeriazableObjectif, 
    Habit, 
    SeriazableHabit, 
    Step, 
    HabitList, 
    ObjectifList, 
    StepList, 
    FilteredHabitsType
}