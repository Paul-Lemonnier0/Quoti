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
    const [isFetched, setIsFetched] = useState(true)

    if(!isFetched) {
        return <AnimatedBasicSpinnerView/>
      }

    return(
        <ObjectifsContext.Provider value={{}}>
            {children}
        </ObjectifsContext.Provider>
    )
}

export { ObjectifsProvider, ObjectifsContext };
