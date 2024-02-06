interface ItemType {
    titre: string,
    description: string,
    color: string,
    icon: string,
    id: string
}

interface ObjectifType extends ItemType {
    startingDate: Date,
    endingDate: Date,
}

interface HabitType extends ItemType {
    habitID?: string,
    alertTime?: string,
    frequency: string,
    bestStreak?: number,
    currentStreak?: number,
    occurence: number,
    reccurence: number,
    daysOfWeek: number[],
    startingDate?: Date,
    lastCompletionDate?: Date,
    notificationEnabled?: boolean,
    objectifID: string | null
    steps: {[key: string]: StepType}[]
}

interface StepType extends ItemType {
    duration: number,
    numero: number,
    habitID: string,
    stepID: string,
    isChecked: boolean,
    created: Date,
    deleted?: Date,
}

export {ObjectifType, HabitType, StepType}