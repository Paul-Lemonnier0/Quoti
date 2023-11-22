import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { addObjectifToFirestore, fetchAllObjectifs } from "../firebase/Firestore_Objectifs_Primitives";
import { AnimatedBasicSpinnerView } from "../components/Spinners/AnimatedSpinner";
import { displayTree } from "../primitives/BasicsMethods";

const ObjectifsContext = createContext()
const ObjectifsProvider = ({children}) => {
    const [AllObjectifs, setAllObjectifs] = useState({})
    const [Objectifs, setObjectifs] = useState({})
    const [isFetched, setIsFetched] = useState(false)

    const addObjectif = async (objectif) => {
        try{
            const addedObjectif = await addObjectifToFirestore(objectif)

            setAllObjectifs(prevObjs => (
                {
                    ...prevObjs, 
                    [addedObjectif.objectifID]: addedObjectif
                }
            ))

            return addedObjectif
        }
    
        catch(e) { console.log("Error while adding objectif : ", e) }
    }

    const fetchObjectifs = async () => {
        console.log("fetching objectifs...")

        return await fetchAllObjectifs()
    }

    const getObjectifsFromHabits = (habitsWithObjectif) => {
        let objectifs = {}

        for(const habit in habitsWithObjectif){
            if(objectifs.hasOwnProperty(habit.objectifID) === false){
                if(AllObjectifs.hasOwnProperty(habit.objectifID)){
                    objectifs[habit.objectifID] = AllObjectifs[habit.objectifID]
                }
            }
        }

        setObjectifs(objectifs)
    }

    useEffect(() => {
        const fetchData = async() => {
            try{
                const objectifs = await fetchAllObjectifs();
                setAllObjectifs(objectifs)

                console.log("objectifs successfully fetched.")
                console.log("Objectifs fetched : ", objectifs)
                console.log("TEST : ", AllObjectifs)
                setIsFetched(true);
            }

            catch(e) { console.log("error while fetching objectifs : ", e)}
        }

        fetchData();
    }, [])

    if(!isFetched) {
        return <AnimatedBasicSpinnerView/>
      }

    return(
        <ObjectifsContext.Provider value={{AllObjectifs, Objectifs, fetchObjectifs, getObjectifsFromHabits, addObjectif}}>
            {children}
        </ObjectifsContext.Provider>
    )
}

export { ObjectifsProvider, ObjectifsContext };
