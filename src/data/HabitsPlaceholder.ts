import { addDays } from "date-fns";
import StepsList from "../components/Habitudes/Step/StepsList"
import { generateUniqueID, toISOStringWithoutTimeZone } from "../primitives/BasicsMethods";
import { FormDetailledHabit } from "../types/FormHabitTypes"
import { FormDetailledObjectif } from "../types/FormObjectifTypes"
import { FrequencyTypes, Habit, PrioritesType, SeriazableHabit, Step, StepList } from "../types/HabitTypes"

const stepPriorities: PrioritesType[] = [PrioritesType.Medium, PrioritesType.High, PrioritesType.Low];

function getRandomPriority(): PrioritesType {
  const index = Math.floor(Math.random() * stepPriorities.length);
  return stepPriorities[index]
}

const today = toISOStringWithoutTimeZone(addDays(new Date(), -90))

const StepsPlaceholder: Step[][] = [
  [
    {
      titre: "Échauffement",
      description: "Échauffement dynamique de 10 minutes",
      numero: 0,
      duration: 10,
      stepID: "b1bd68c7-021c-4b21-b029-2a4314980c9f",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Course",
      description: "Course de 5 km",
      numero: 1,
      duration: 30,
      stepID: "59b3d1a4-4a7c-4d8c-82fe-72a13cc0f11c",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Étirements",
      description: "Étirements post-course de 10 minutes",
      numero: 2,
      duration: 10,
      stepID: "b1bd68c7-021c-4b21-b029-2a4314980c9g",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    }
  ],

  [
    {
      titre: "Méditation guidée",
      description: "Session de méditation de 15 minutes",
      numero: 0,
      duration: 15,
      stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f964e",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Respiration profonde",
      description: "Exercices de respiration profonde",
      numero: 1,
      duration: 10,
      stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f964f",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    }
  ],

  [
    {
      titre: "Écriture",
      description: "Écrire pendant 30 minutes",
      numero: 0,
      duration: 30,
      stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa7",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Révision",
      description: "Révision et correction du texte",
      numero: 1,
      duration: 20,
      stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa8",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    }
  ],

  [
    {
      titre: "Verre d'eau",
      description: "Boire un verre d'eau",
      numero: 0,
      duration: 1,
      stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f964f",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Hydratation",
      description: "Boire de l'eau tout au long de la journée",
      numero: 1,
      duration: 0,
      stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f9650",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    }
  ],

  [
    {
      titre: "Repas équilibré",
      description: "Préparer et manger un repas équilibré",
      numero: 0,
      duration: 45,
      stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa8",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Collation saine",
      description: "Prendre une collation saine",
      numero: 1,
      duration: 15,
      stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa9",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    }
  ],

  [
    {
      titre: "Tricot",
      description: "Tricoter pendant 45 minutes",
      numero: 0,
      duration: 45,
      stepID: "78b4d0f8-c6f5-4d6e-8f87-176a88acaa23",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    },
    {
      titre: "Choix de couleurs",
      description: "Choisir les couleurs pour le prochain projet",
      numero: 1,
      duration: 15,
      stepID: "78b4d0f8-c6f5-4d6e-8f87-176a88acaa24",
      habitID: "",
      created: today,
      priority: getRandomPriority()
    }
  ]
]


export const habitsPlaceholder: FormDetailledHabit[] = [
  {
    color: "#E67E22",
    daysOfWeek: [],
    titre: "Entraînement Semi-Marathon",
    description: "Course d'entraînement pour le semi-marathon",
    startingDate: today,
    occurence: 3,
    reccurence: 2,
    objectifID: undefined,
    frequency: FrequencyTypes.Quotidien,
    steps: StepsPlaceholder[0],
    icon: "run",
    notificationEnabled: true,
    alertTime: "undefined",
  },

  {
    color: "#3498DB",
    daysOfWeek: [],
    titre: "Méditation",
    description: "Séance de méditation quotidienne",
    startingDate: today,
    occurence: 1,
    reccurence: 1,
    objectifID: undefined,
    frequency: FrequencyTypes.Quotidien,
    steps: StepsPlaceholder[1],
    icon: "meditation",
    notificationEnabled: true,
    alertTime: ""
  },

  {
    color: "#27AE60",
    daysOfWeek: [2, 4],
    titre: "Écriture créative",
    description: "Session d'écriture créative",
    startingDate: today,
    occurence: 1,
    reccurence: 2,
    frequency: FrequencyTypes.Hebdo,
    steps: StepsPlaceholder[2],
    icon: "pencil",
    objectifID: undefined,
    notificationEnabled: true,
    alertTime: ""
  },


  {
    color: "#3498DB",
    daysOfWeek: [],
    titre: "Hydratation",
    description: "Boire de l'eau régulièrement",
    startingDate: today,
    occurence: 8,
    reccurence: 1,
    frequency: FrequencyTypes.Quotidien,
    steps: StepsPlaceholder[3],
    icon: "water",
    objectifID: undefined,
    notificationEnabled: true,
    alertTime: ""
  },

  {
    color: "#27AE60",
    daysOfWeek: [0, 2, 4],
    titre: "Nourriture saine",
    description: "Choix alimentaires sains",
    startingDate: today,
    occurence: 3,
    reccurence: 1,
    frequency: FrequencyTypes.Quotidien,
    steps: StepsPlaceholder[4],
    icon: "healthy",
    objectifID: undefined,
    notificationEnabled: true,
    alertTime: ""
  },

  {
    color: "#F39C12",
    daysOfWeek: [2],
    titre: "Tricot",
    description: "Séance de tricot créatif",
    startingDate: today,
    occurence: 2,
    reccurence: 2,
    frequency: FrequencyTypes.Hebdo,
    steps: StepsPlaceholder[5], 
    icon: "Yarn",
    objectifID: undefined,
    notificationEnabled: true,
    alertTime: ""
  }
]

export const ObjectifPlaceholder_SemiMarathon = () => {
  const objectif: FormDetailledObjectif = {
    color: "#FFC902",
    titre: "Préparation Semi-Marathon de Paris",
    description: "Objectif de préparation physique et mentale pour le semi-marathon",
    icon: "run",
    startingDate: today,
    endingDate: toISOStringWithoutTimeZone(addDays(new Date(today), 90)),
  };

  const habits: FormDetailledHabit[] = [
    {
      color: "#FFC902",
      daysOfWeek: [1, 3, 5],
      titre: "Course Régulière",
      description: "Entraînement quotidien pour le semi-marathon",
      startingDate: today,
      // endingDate: "Tue Nov 28 2023",
      occurence: 2,
      reccurence: 1,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Échauffement",
          description: "Échauffement dynamique de 10 minutes",
          numero: 0,
          duration: 10,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        },
        {
          titre: "Course",
          description: "Course de 5 km",
          numero: 1,
          duration: 30,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        },
        {
          titre: "Étirements",
          description: "Étirements post-course de 10 minutes",
          numero: 2,
          duration: 10,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        }
      ],
      icon: "run",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    },

    {
      color: "#FFC902",
      daysOfWeek: [],
      titre: "Dormir Suffisamment",
      description: "Prioriser le sommeil pour une meilleure récupération",
      startingDate: today,
      // endingDate: "Tue Nov 28 2023",
      occurence: 1,
      reccurence: 1,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Routine de coucher",
          description: "Mise en place d'une routine avant le coucher",
          numero: 0,
          duration: 30,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        }
      ],
      icon: "Zzz",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    },

    {
      color: "#FFC902",
      daysOfWeek: [0, 2, 4],
      titre: "Manger Sain",
      description: "Adopter une alimentation équilibrée",
      startingDate: today,
      // endingDate: "Tue Nov 28 2023",
      occurence: 3,
      reccurence: 1,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Repas équilibré",
          description: "Préparer et manger un repas équilibré",
          numero: 0,
          duration: 45,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        },
        {
          titre: "Collation saine",
          description: "Prendre une collation saine",
          numero: 1,
          duration: 15,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        }
      ],
      icon: "healthy",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    },

    {
      color: "#FFC902",
      daysOfWeek: [1, 3, 5],
      titre: "Éviter l'Alcool",
      description: "Se priver d'alcool pendant la préparation au semi-marathon",
      startingDate: today,
      // endingDate: "Tue Nov 28 2023",
      occurence: 1,
      reccurence: 2,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Alternative sans alcool",
          description: "Découvrir des alternatives sans alcool",
          numero: 0,
          duration: 20,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        }
      ],
      icon: "beer",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    },
  ];

  return { objectif, habits };
};

export const ObjectifPlaceholder_Meditation = () => {
  const objectif: FormDetailledObjectif = {
    color: "#FFFFFF",
    titre: "Bien-Être Personnel",
    description: "Objectif de favoriser le bien-être personnel à travers différentes habitudes",
    icon: "meditation",
    startingDate: today,
    endingDate: toISOStringWithoutTimeZone(addDays(new Date(today), 90)),
  };

  const habits: FormDetailledHabit[] = [
    {
      color: "#FFFFFF",
      daysOfWeek: [0, 2, 4],
      titre: "Méditation Quotidienne",
      description: "Séance quotidienne de méditation",
      startingDate: today,
      // endingDate: "Sat Dec 30 2024",
      occurence: 1,
      reccurence: 1,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Méditation guidée",
          description: "Session de méditation de 20 minutes",
          numero: 0,
          duration: 20,
          priority: getRandomPriority(),
          stepID: generateUniqueID(),
        }
      ],
      icon: "meditation",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    },

    {
      color: "#FFFFFF",
      daysOfWeek: [1, 3],
      titre: "Écriture Créative",
      description: "Session d'écriture créative",
      // startingDate: today,
      // endingDate: "Sat Dec 30 2024",
      occurence: 1,
      reccurence: 2,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Écriture",
          description: "Écrire pendant 30 minutes",
          numero: 0,
          duration: 30,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        },
        {
          titre: "Révision",
          description: "Révision et correction du texte",
          numero: 1,
          duration: 20,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        }
      ],
      icon: "pencil",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    },

    {
      color: "#FFFFFF",
      daysOfWeek: [2],
      titre: "Tricot Créatif",
      description: "Séance de tricot créatif",
      // startingDate: today,
      // endingDate: "Sat Dec 30 2024",
      occurence: 2,
      reccurence: 2,
      frequency: FrequencyTypes.Quotidien,
      steps: [
        {
          titre: "Tricot",
          description: "Tricoter pendant 45 minutes",
          numero: 0,
          duration: 45,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        },
        {
          titre: "Choix de couleurs",
          description: "Choisir les couleurs pour le prochain projet",
          numero: 1,
          duration: 15,
          stepID: generateUniqueID(),
          priority: getRandomPriority()
        }
      ],
      icon: "Yarn",
      notificationEnabled: true,
      alertTime: "",
      objectifID: undefined
    }
  ];

  return { objectif, habits };
};
