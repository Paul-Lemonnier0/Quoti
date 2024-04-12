import HabitStepsForm from "../../../components/Forms/HabitStepsForm";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { FormFullStep, FormStep, FormStepsHabitValues } from "../../../types/FormHabitTypes";
import { Step } from "../../../types/HabitTypes";
import React from "react"

type EditHabitStepsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitStepsScreen">

const EditHabitStepsScreen: FC<EditHabitStepsScreenProps> = ({route, navigation}) => {

    const {newValues, oldHabit, isNewObjectifHabit} = route.params

    const handleGoNext = (values: FormStepsHabitValues) => {

        let oldStepsArray = Object.values(oldHabit.steps)

        //On filtre pour enlever le placeholder
        let updatedStepsArray: (Step | FormStep)[] = oldStepsArray.filter((step) => (step as Step).stepID !== oldHabit.habitID)

        if(values.steps){
            const today = new Date().toISOString()
            const newStepIDs: string[] = values.steps.map((step) => (step as (Step | FormFullStep)).stepID);
            
            //les deleted
            const deletedSteps = updatedStepsArray.map((step) => {
                if(step as (Step | FormFullStep)){
                    //Si les nouvelles steps ne contiennent pas une step d'avant on met à jour le deleted
                    if(!newStepIDs.includes((step as (Step | FormFullStep)).stepID)) {
                        return step = {...step, deleted: today}
                    }
                }
            }).filter(step => step != undefined)


            //les added, intact, modified
            const otherSteps = values.steps.map(step => {
                //Si l'étape est déjà connue
                if("created" in step){
                    //Si l'étape n'éxistait pas avant dans l'habit (normalement on rentre pas dedans)
                    if(!oldHabit.steps.hasOwnProperty((step as Step).stepID))
                        return {...step, created: today}

                    else {
                        //Si l'étape a simplement été modifiée
                        if(oldHabit.steps[(step as Step).stepID] != step) {
                            return {...step, created: today}
                        }

                        else {
                            //Sinon on ajoute sans mettre à jour la date de création
                            return {...step}
                        }
                    }
                }

                //Si c'est une nouvelle étape
                else {
                    return {...step, created: today}
                }
            });

            // console.log(updatedStepsArray.concat())

            // console.log("/////////////////////////////////////////////")
    
            // console.log("Deleted steps : ")
            // deletedSteps.map((step) => {
            //     if(step && "titre" in step) 
            //         console.log(step.titre)
            // })

            // console.log("Other steps (Added, intact, modified) : ")
            // otherSteps.map((step) => {
            //     if(step && "titre" in step) 
            //         console.log(step.titre)
            // })

            updatedStepsArray = [...deletedSteps, ...otherSteps] as (Step | FormStep)[]
            
            //Suppression du placeholder
            if(updatedStepsArray.filter(step => step.numero !== -1 && !("deleted" in step)).length > 0) {
                updatedStepsArray = updatedStepsArray.map(step => step.numero === -1 ? {...step, deleted: today} : {...step})
            }

            //Ajout du placeholder
            if(updatedStepsArray.filter(step => !("deleted" in step)).length === 0) {
                updatedStepsArray = [{created: today, numero: -1}]
            }

            // console.log("test :" )
            // updatedStepsArray.map((step) => {
            //     if("titre" in step) {
            //         console.log("titre: ", step.titre)
            //     }

            //     if("created" in step) {
            //         console.log("created: ",step.created)
            //         console.log(step)
            //     }   

            //     if("deleted" in step) {
            //         console.log("deleted: ",step.deleted)
            //     }            
                
            //     console.log("##############")
            // })
        }

        navigation.navigate("EditHabitAdvancedDetailsScreen", {
            newValues: {
                ...newValues, 
                steps: updatedStepsArray
            }, 
            oldHabit,
            isNewObjectifHabit
        })
    }


    return(
        <HabitStepsForm
            isNewObjectifHabit
            isForModifyingHabit
            habit={{...oldHabit, ...newValues}}
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitStepsScreen
