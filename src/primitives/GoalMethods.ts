import { FilteredHabitsType, Goal, GoalList, SeriazableGoal } from "../types/HabitTypes"
import { displayTree, toISOStringWithoutTimeZone } from "./BasicsMethods"

export const getSeriazableGoal = (goal: Goal): SeriazableGoal => {
    const startingDate = toISOStringWithoutTimeZone(goal.startingDate)
    const endingDate = goal.endingDate ? toISOStringWithoutTimeZone(goal.endingDate) : undefined

    return({
        ...goal,
        startingDate,
        endingDate
    })
}

export const removeGoalFromGoals = (Goals: GoalList, goalID: string): GoalList => {
    const goals = {...Goals}
    delete goals[goalID]

    return goals;
}

export const removeGoalFromFilteredHabits = (filteredHabits: FilteredHabitsType, goalID: string): FilteredHabitsType => {
    const updatedFilteredHabits  = {...filteredHabits}

    delete updatedFilteredHabits.Quotidien.Goals?.[goalID]
    delete updatedFilteredHabits.Hebdo.Goals?.[goalID]
    delete updatedFilteredHabits.Mensuel.Goals?.[goalID]

    return {...updatedFilteredHabits}
}

export const convertBackSeriazableGoal = (goal: SeriazableGoal): Goal => {
    const startingDate = new Date(goal.startingDate)
    const endingDate = goal.endingDate ? new Date(goal.endingDate) : undefined

    return({
        ...goal,
        startingDate,
        endingDate
    })
}