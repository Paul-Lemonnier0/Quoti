import { FrequencyTypes, Habit, Objectif } from "./HabitTypes";

export const DEFAULT_HABIT: Habit = {
    habitID: "defaut",
    titre: "defaut",
    description: "defaut",
    icon: "run",
    color: "#ffffff",
    frequency: FrequencyTypes.Quotidien,
    occurence: 1,
    reccurence: 1,
    daysOfWeek: [],
    steps: {},
    startingDate: new Date(),
    bestStreak: 0,
    currentStreak: 0,
    lastCompletionDate: "none",
    objectifID: undefined,
    members: []
}

export const DEFAULT_OBJECTIF: Objectif = {
    objectifID: "defaut",
    titre: "default",
    description: "default",
    startingDate: new Date(),
    endingDate: new Date(),
    icon: "run",
    color: "#ffffff",
}