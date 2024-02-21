import { Objectif, SeriazableObjectif } from "../types/HabitTypes"

export const getSeriazableObjectif = (objectif: Objectif): SeriazableObjectif => {
    const startingDate = objectif.startingDate.toDateString()
    const endingDate = objectif.endingDate.toDateString()

    return({
        ...objectif,
        startingDate,
        endingDate
    })
}

export const convertBackSeriazableObjectif = (objectif: SeriazableObjectif): Objectif => {
    const startingDate = new Date(objectif.startingDate)
    const endingDate = new Date(objectif.endingDate)

    return({
        ...objectif,
        startingDate,
        endingDate
    })
}