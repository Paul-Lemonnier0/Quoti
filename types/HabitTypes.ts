export enum FrequencyTypes {
    Quotidien = "Quotidien",
    Hebdo = "Hebdo",
    Mensuel = "Mensuel",
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
    endingDate: Date,
}

interface SeriazableObjectif extends BaseObjectif {
    startingDate: string,
    endingDate: string,
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
    isChecked?: boolean
}

interface HabitList {
    [habitID: string]: Habit
}

interface ObjectifList {
    [objectifID: string]: Objectif
}

interface StepList {
    [stepID: string]: Step
}

interface FilteredHabitsType {
    Quotidien: {
        Habitudes?: HabitList,
        Objectifs?: ObjectifList,
    }

    Hebdo: {
        Habitudes?: HabitList,
        Objectifs?: ObjectifList,
    }

    Mensuel: {
        Habitudes?: HabitList,
        Objectifs?: ObjectifList,
    }
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