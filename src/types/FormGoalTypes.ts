interface FormBasicGoal {
    titre: string,
    description: string,
    startingDate: string,
    endingDate?: string
}

interface FormColoredGoal extends FormBasicGoal {
    color: string
}

interface FormDetailledGoal extends FormColoredGoal {
    icon: string
}

export {
    FormBasicGoal,
    FormColoredGoal,
    FormDetailledGoal
}