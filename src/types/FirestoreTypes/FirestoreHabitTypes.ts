import { FrequencyTypes, PrioritesType, StepList } from "../HabitTypes"

interface FirestoreBaseItem {
    titre: string,
    description: string,
    icon: string,
    color: string,
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


interface FirestoreObjectif extends FirestoreBaseItem {
    endingDate: string
}

interface GlobalFirestoreObjectif extends FirestoreBaseItem {
    objectifID: string
}

interface UserFirestoreObjectif {
    startingDate: string,
    endingDate?: string,
    objectifID: string
}

export interface MemberType {
    mail: string,
    id: string
}

interface GlobalHabitType extends FirestoreBaseItem {
    daysOfWeek: number[],
    occurence: number,
    reccurence: number,
    members: MemberType[],
}

interface GlobalFirestoreHabit extends GlobalHabitType {
    steps: FirestoreStep[],
    frequency: string
}

interface GlobalHabit extends GlobalHabitType {
    steps: StepList,
    frequency: FrequencyTypes,
}

interface UserFirestoreHabit {
    habitID: string,
    alertTime: string,
    bestStreak: number,
    currentStreak: number,
    lastCompletionDate: string,
    notificationEnabled: boolean,
    objectifID: string | null,
    doneDates?: Date[],
    startingDate: string,
}


export {
    GlobalHabit,
    GlobalFirestoreHabit,
    UserFirestoreHabit,

    FirestorePlaceholderStep,
    FirestoreFullStep,
    FirestoreStep,

    FirestoreObjectif,
    UserFirestoreObjectif,
    GlobalFirestoreObjectif
}