import React, { FC, useContext } from "react"
import { EditObjectifStackProps } from "./EditObjectifNav"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ObjectifBasicForm } from "../../../components/Forms/ObjectifForm/ObjectifBasicForm"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import { FormBasicObjectif } from "../../../types/FormObjectifTypes"

type EditObjectifBasicDetailsScreenProps = NativeStackScreenProps<EditObjectifStackProps, "EditObjectifBasicDetailsScreen">

const EditObjectifBasicDetailsScreen: FC<EditObjectifBasicDetailsScreenProps> = ({route, navigation}) => {
    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {objectif} = route.params

    const handleGoNext = (values: FormBasicObjectif) => {
        console.log(values)
        navigation.navigate("EditObjectifColorScreen", {newValues: {...values}, oldObjectif: {...objectif}})
    }

    return(
        <ObjectifBasicForm
            handleGoNext={handleGoNext}
            objectif={objectif}
            closeModal={closeModal}/>
    )
}

export default EditObjectifBasicDetailsScreen