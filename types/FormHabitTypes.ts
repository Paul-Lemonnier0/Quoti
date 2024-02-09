import { FrequencyTypes } from "./HabitTypes"

interface FormPlaceholderStep {
    numero: number
}

interface FormFullStep extends FormPlaceholderStep {
    titre: string,
    description: string,
    duration: number | undefined,
}

type FormStep = FormPlaceholderStep | FormFullStep

interface FormBasicHabit {
    titre: string,
    description: string,
    objectifID: string | undefined,
    startingDate?: string,
    endingDate?: string,
}

interface FormColoredHabit extends FormBasicHabit {
    color: string
}

interface FormIconedHabit extends FormColoredHabit {
    icon: string
}

interface FormStepsHabit extends FormIconedHabit {
    steps: FormStep[]
}

interface FormDetailledHabit extends FormStepsHabit {
    frequency: FrequencyTypes,
    occurence: number,
    reccurence: number,
    daysOfWeek: number[],
    notificationEnabled: boolean,
    alertTime: string
}

export {
    FormPlaceholderStep,
    FormFullStep,
    FormStep,
    FormBasicHabit,
    FormColoredHabit,
    FormIconedHabit,
    FormStepsHabit,
    FormDetailledHabit,
}