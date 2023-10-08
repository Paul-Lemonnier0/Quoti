import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { Habitudes } from "../data/habitudes"
import { db } from "./InitialisationFirebase"

const userID = "Paul"

const addNewHabit = async(habit) => {

    const habitID = await addHabitToFireStore(habit)
    const newHabit = {...habit, id: habitID}

    await addSteps(habit.steps, habitID)

    return newHabit
}

const addHabitToFireStore = async(habit) => {

    const habitRef = addDoc(collection(db, "Habits"), {
        titre: habit.titre,
        description: habit.description,
        color: habit.color,
        icon: habit.icon,
        frequency: habit.frequency, //quotidien, ...
        occurence: habit.occurence, //cb de fois sur la période
        réccurence: habit.reccurence, //tous les X mois, toutes les X semaines
        daysOfWeek: habit.daysOfWeek,   //sur quels jours de la semaine
        notificationEnabled: habit.notificationEnabled, //true ou false
        alertTime: habit.alertTime, //null si notificationEnabled = false
        userID: userID
      })
  
    console.log("Habit well added to firestore.")

    return (await habitRef).id
}

const getAllOwnHabits = async() => {

    const qry = query(collection(db, "Habits"), where("userID", "==", userID));
    const querySnapshot = await getDocs(qry)

    const habitPromises = querySnapshot.docs.map(async (doc) => {
        const habitID = doc.id;
        const steps = await getAllHabitSteps(habitID);
        const data = doc.data();
        return { habitID, steps, ...data };
      });

      return Promise.all(habitPromises);
}

const getAllHabitSteps = async (habitID) => {

    const qry = query(collection(db, "Steps"), where("habitID", "==", habitID));
    const querySnapshot = await getDocs(qry);
  
    const steps = [];
  
    querySnapshot.forEach((doc) => {
      steps.push({ stepID: doc.id, ...doc.data() });
    });

    console.log(" steps : ",steps)
  
    return steps;
  };

const addSteps = async(steps, habitID) => {

    const stepsWithID = await Promise.all(
        steps.map(async (step) => {
          const stepID = await addStep(step, habitID);
          const stepWithID = { ...step, id: stepID };
          return stepWithID;
        })
      );
    
      return stepsWithID;
}

const addStep = async(step, habitID) => {
    const stepRef = addDoc(collection(db, "Steps"), {
        title: step.title,
        description: step.description,
        duration: step.duration, //en minutes
        habitID: habitID
    })

    console.log("step well added.")

    return (await stepRef).id
}

export {addHabitToFireStore, getAllOwnHabits, addNewHabit, addSteps}