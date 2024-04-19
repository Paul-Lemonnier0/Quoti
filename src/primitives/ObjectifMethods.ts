import { FilteredHabitsType, Objectif, ObjectifList, SeriazableObjectif } from "../types/HabitTypes"
import { displayTree, toISOStringWithoutTimeZone } from "./BasicsMethods"

export const getSeriazableObjectif = (objectif: Objectif): SeriazableObjectif => {
    const startingDate = toISOStringWithoutTimeZone(objectif.startingDate)
    const endingDate = objectif.endingDate ? toISOStringWithoutTimeZone(objectif.endingDate) : undefined

    return({
        ...objectif,
        startingDate,
        endingDate
    })
}

export const removeObjectifFromObjectifs = (Objectifs: ObjectifList, objectifID: string): ObjectifList => {
    const objectifs = {...Objectifs}
    delete objectifs[objectifID]

    return objectifs;
}

export const removeObjectifFromFilteredHabits = (filteredHabits: FilteredHabitsType, objectifID: string): FilteredHabitsType => {
    const updatedFilteredHabits  = {...filteredHabits}

    delete updatedFilteredHabits.Quotidien.Objectifs?.[objectifID]
    delete updatedFilteredHabits.Hebdo.Objectifs?.[objectifID]
    delete updatedFilteredHabits.Mensuel.Objectifs?.[objectifID]

    return {...updatedFilteredHabits}
}

export const convertBackSeriazableObjectif = (objectif: SeriazableObjectif): Objectif => {
    const startingDate = new Date(objectif.startingDate)
    const endingDate = objectif.endingDate ? new Date(objectif.endingDate) : undefined

    return({
        ...objectif,
        startingDate,
        endingDate
    })
}