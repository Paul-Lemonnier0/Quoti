import { FrequencyTypes, Habit, Goal } from "./HabitTypes";

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
    goalID: undefined,
    members: []
}

export const DEFAULT_GOAL: Goal = {
    goalID: "defaut",
    titre: "default",
    description: "default",
    startingDate: new Date(),
    endingDate: new Date(),
    icon: "run",
    color: "#ffffff",
}