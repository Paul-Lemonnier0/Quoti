import { FrequencyTypes, PrioritesType, Step } from "./HabitTypes"

interface FormPlaceholderStep {
    numero: number,
}

interface FormFullStep extends FormPlaceholderStep {
    titre: string,
    description: string,
    duration: number | undefined,
    stepID: string,
    priority?: PrioritesType
}

type FormStep = FormPlaceholderStep | FormFullStep

interface FormBasicHabit {
    titre: string,
    description: string,
    objectifID: string | undefined,
}

export interface FormColoredHabitValues {
    color: string
}

export interface FormIconedHabitValues {
    icon: string
}

export interface FormStepsHabitValues {
    steps: (FormStep | Step)[]
}

export interface FormDetailledHabitValues {
    frequency: FrequencyTypes,
    occurence: number,
    reccurence: number,
    daysOfWeek: number[],
    notificationEnabled: boolean,
    alertTime: string
}

interface FormColoredHabit extends FormBasicHabit, FormColoredHabitValues {}
interface FormIconedHabit extends FormColoredHabit, FormIconedHabitValues {}
interface FormStepsHabit extends FormIconedHabit, FormStepsHabitValues {}
interface FormDetailledHabit extends FormStepsHabit, FormDetailledHabitValues {}

interface FormDetailledObjectifHabit extends FormDetailledHabit {
    habitID: string
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
    FormDetailledObjectifHabit
}