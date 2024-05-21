import { FormDetailledGoal } from "../types/FormGoalTypes"
import { Goal } from "../types/HabitTypes"

const Goal_Skeleton: FormDetailledGoal ={
    titre: "A",
    description: "A",
    color: "transparent",
    icon: "ArtistPalette",
    startingDate: "",
    endingDate: ""
}

const NUMBER_OF_GOALS_SKELETON = 3

const Goals_Skeleton: FormDetailledGoal[] = Array(NUMBER_OF_GOALS_SKELETON).fill(Goal_Skeleton)
export {Goals_Skeleton}