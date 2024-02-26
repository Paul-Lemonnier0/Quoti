interface FormBasicObjectif {
    titre: string,
    description: string,
    startingDate: string,
    endingDate: string
}

interface FormColoredObjectif extends FormBasicObjectif {
    color: string
}

interface FormDetailledObjectif extends FormColoredObjectif {
    icon: string
}

export {
    FormBasicObjectif,
    FormColoredObjectif,
    FormDetailledObjectif
}