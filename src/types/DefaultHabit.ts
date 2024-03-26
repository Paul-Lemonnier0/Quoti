import { FrequencyTypes, Habit } from "./HabitTypes";

export const DefaultHabit: Habit = {
    habitID: "habitDefaultID",
    titre: "Habit par défaut",
    description: "Description habit par défaut",
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
    objectifID: undefined
}