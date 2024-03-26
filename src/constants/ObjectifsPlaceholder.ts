import { FormDetailledObjectif } from "../types/FormObjectifTypes"

const Objectif_Skeleton: FormDetailledObjectif ={
    titre: "A",
    description: "A",
    color: "transparent",
    icon: "ArtistPalette",
    startingDate: "",
    endingDate: ""
}

const NUMBER_OF_OBJECTIFS_SKELETON = 3

const Objectifs_Skeleton: FormDetailledObjectif[] = Array(NUMBER_OF_OBJECTIFS_SKELETON).fill(Objectif_Skeleton)
export {Objectifs_Skeleton}