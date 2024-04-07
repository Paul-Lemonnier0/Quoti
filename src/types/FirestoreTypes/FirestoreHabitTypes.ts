import { PrioritesType } from "../HabitTypes"

interface FirestoreBaseItem {
    titre: string,
    description: string,
    icon: string,
    color: string,
    startingDate: string,
}

interface FirestorePlaceholderStep {
    created: string,
    numero: number
}

interface FirestoreFullStep extends FirestorePlaceholderStep {
    deleted?: string,
    titre: string,
    description: string,
    habitID: string,
    stepID: string,
    duration: number,
    priority?: PrioritesType
}

type FirestoreStep = FirestoreFullStep | FirestorePlaceholderStep

interface FirestoreHabit extends FirestoreBaseItem {
    alertTime: string,
    bestStreak: number,
    currentStreak: number,
    daysOfWeek: number[],
    frequency: string,
    lastCompletionDate: string,
    notificationEnabled: boolean,
    objectifID: string | null,
    occurence: number,
    reccurence: number,
    steps: FirestoreStep[]
}

interface FirestoreObjectif extends FirestoreBaseItem {
    endingDate: string
}

export {
    FirestorePlaceholderStep,
    FirestoreFullStep,
    FirestoreStep,
    FirestoreHabit,
    FirestoreObjectif
}