export const getSeriazableObjectif = (objectif) => {
    const startingDate = objectif.startingDate.toDateString()
    const endingDate = objectif.endingDate.toDateString()

    return({
        ...objectif,
        startingDate,
        endingDate
    })
}

export const convertBackSeriazableObjectif = (objectif) => {
    const startingDate = new Date(objectif.startingDate)
    const endingDate = new Date(objectif.endingDate)

    return({
        ...objectif,
        startingDate,
        endingDate
    })
}