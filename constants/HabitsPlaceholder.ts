import { FormDetailledHabit } from "../types/FormHabitTypes"
import { FrequencyTypes } from "../types/HabitTypes"

const Habit_Skeleton: FormDetailledHabit ={
    titre: "A",
    description: "A",
    color: "transparent",
    icon: "ArtistPalette",
    frequency: FrequencyTypes.Quotidien,
    occurence: 1,
    reccurence: 1,
    daysOfWeek: [],
    steps: [],
    objectifID: undefined,
    alertTime: "",
    notificationEnabled: true
}

const NUMBER_OF_HABITS_SKELETON = 3

const Habits_Skeleton = Array(NUMBER_OF_HABITS_SKELETON).fill(Habit_Skeleton)
export {Habits_Skeleton}