import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/InitialisationFirebase";

export function useAuthentification(){
    const [user, setUser] = useState();

    useEffect(() => {
      const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {

        if (user) {

          setUser(user);
        } else {
          setUser(undefined);
        }
      });
  
      return unsubscribeFromAuthStatuChanged;
    }, []);

    return {user};
}