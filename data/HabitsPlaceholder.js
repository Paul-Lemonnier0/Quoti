export const habitsPlaceholder = [
    {
        color: "#E67E22",
        daysOfWeek: [],
        titre: "Entraînement Semi-Marathon",
        description: "Course d'entraînement pour le semi-marathon",
        startingDate: "Thu Nov 24 2023",
        occurence: 3,
        reccurence: 2,
        frequency: "Quotidien",
        steps: [
          {
            titre: "Échauffement",
            description: "Échauffement dynamique de 10 minutes",
            numero: 0,
            duration: 10,
            stepID: "b1bd68c7-021c-4b21-b029-2a4314980c9f"
          },
          {
            titre: "Course",
            description: "Course de 5 km",
            numero: 1,
            duration: 30,
            stepID: "59b3d1a4-4a7c-4d8c-82fe-72a13cc0f11c"
          },
          {
            titre: "Étirements",
            description: "Étirements post-course de 10 minutes",
            numero: 2,
            duration: 10,
            stepID: "b1bd68c7-021c-4b21-b029-2a4314980c9g"
          }
        ],
        userID: "Paul",
        icon: "run"
      },

      {
        color: "#3498DB",
        daysOfWeek: [],
        titre: "Méditation",
        description: "Séance de méditation quotidienne",
        startingDate: "Thu Nov 24 2023",
        occurence: 1,
        reccurence: 1,
        frequency: "Quotidien",
        steps: [
          {
            titre: "Méditation guidée",
            description: "Session de méditation de 15 minutes",
            numero: 0,
            duration: 15,
            stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f964e"
          },
          {
            titre: "Respiration profonde",
            description: "Exercices de respiration profonde",
            numero: 1,
            duration: 10,
            stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f964f"
          }
        ],
        userID: "Paul",
        icon: "meditation"
      },
      
      {
        color: "#27AE60",
        daysOfWeek: [2, 4],
        titre: "Écriture créative",
        description: "Session d'écriture créative",
        startingDate: "Thu Nov 24 2023",
        occurence: 1,
        reccurence: 2,
        frequency: "Hebdo",
        steps: [
          {
            titre: "Écriture",
            description: "Écrire pendant 30 minutes",
            numero: 0,
            duration: 30,
            stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa7"
          },
          {
            titre: "Révision",
            description: "Révision et correction du texte",
            numero: 1,
            duration: 20,
            stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa8"
          }
        ],
        userID: "Paul",
        icon: "pencil"
      },
      

      {
        color: "#3498DB",
        daysOfWeek: [],
        titre: "Hydratation",
        description: "Boire de l'eau régulièrement",
        startingDate: "Thu Nov 24 2023",
        occurence: 8,
        reccurence: 1,
        frequency: "Quotidien",
        steps: [
          {
            titre: "Verre d'eau",
            description: "Boire un verre d'eau",
            numero: 0,
            duration: 1,
            stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f964f"
          },
          {
            titre: "Hydratation",
            description: "Boire de l'eau tout au long de la journée",
            numero: 1,
            duration: 0,
            stepID: "fd272a3e-5063-4d96-8a2a-1e5eeb0f9650"
          }
        ],
        userID: "Paul",
        icon: "water"
      },     
      
      {
        color: "#27AE60",
        daysOfWeek: [0, 2, 4],
        titre: "Nourriture saine",
        description: "Choix alimentaires sains",
        startingDate: "Thu Nov 24 2023",
        occurence: 3,
        reccurence: 1,
        frequency: "Quotidien",
        steps: [
          {
            titre: "Repas équilibré",
            description: "Préparer et manger un repas équilibré",
            numero: 0,
            duration: 45,
            stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa8"
          },
          {
            titre: "Collation saine",
            description: "Prendre une collation saine",
            numero: 1,
            duration: 15,
            stepID: "c47c4c15-05f5-4e1d-926c-32a9b002eaa9"
          }
        ],
        userID: "Paul",
        icon: "healthy"
      },
            
    {
        color: "#F39C12",
        daysOfWeek: [2],
        titre: "Tricot",
        description: "Séance de tricot créatif",
        startingDate: "Thu Nov 24 2023",
        occurence: 2,
        reccurence: 2,
        frequency: "Hebdo",
        steps: [
        {
            titre: "Tricot",
            description: "Tricoter pendant 45 minutes",
            numero: 0,
            duration: 45,
            stepID: "78b4d0f8-c6f5-4d6e-8f87-176a88acaa23"
        },
        {
            titre: "Choix de couleurs",
            description: "Choisir les couleurs pour le prochain projet",
            numero: 1,
            duration: 15,
            stepID: "78b4d0f8-c6f5-4d6e-8f87-176a88acaa24"
        }
        ],
        userID: "Paul",
        icon: "Yarn"
    }   
]

export const ObjectifPlaceholder_SemiMarathon = () => {
    const objectif = {
        color: "#FFC902",
        titre: "Préparation Semi-Marathon de Paris",
        description: "Objectif de préparation physique et mentale pour le semi-marathon",
        icon: "run",
        startingDate: "Sat Nov 25 2023",
        endingDate: "Tue Nov 28 2023",
        userID: "Paul"
      }
    
    const habits = [
    {
        "color": "#FFC902",
        "daysOfWeek": [1, 3, 5],
        "titre": "Course Régulière",
        "description": "Entraînement quotidien pour le semi-marathon",
        "startingDate": "Sat Nov 25 2023",
        "endingDate": "Tue Nov 28 2023",
        "occurence": 2,
        "reccurence": 1,
        "frequency": "Quotidien",
        "steps": [
          {
            "titre": "Échauffement",
            "description": "Échauffement dynamique de 10 minutes",
            "numero": 0,
            "duration": 10,
            "stepID": "b1bd68c7-021c-4b21-b029-2a4314980c9f"
          },
          {
            "titre": "Course",
            "description": "Course de 5 km",
            "numero": 1,
            "duration": 30,
            "stepID": "59b3d1a4-4a7c-4d8c-82fe-72a13cc0f11c"
          },
          {
            "titre": "Étirements",
            "description": "Étirements post-course de 10 minutes",
            "numero": 2,
            "duration": 10,
            "stepID": "b1bd68c7-021c-4b21-b029-2a4314980c9g"
          }
        ],
        "userID": "Paul",
        "icon": "run"
    },

    {
        "color": "#FFC902",
        "daysOfWeek": [],
        "titre": "Dormir Suffisamment",
        "description": "Prioriser le sommeil pour une meilleure récupération",
        "startingDate": "Sat Nov 25 2023",
        "endingDate": "Tue Nov 28 2023",
        "occurence": 1,
        "reccurence": 1,
        "frequency": "Quotidien",
        "steps": [
          {
            "titre": "Routine de coucher",
            "description": "Mise en place d'une routine avant le coucher",
            "numero": 0,
            "duration": 30,
            "stepID": "fd272a3e-5063-4d96-8a2a-1e5eeb0f9651"
          }
        ],
        "userID": "Paul",
        "icon": "Zzz"
    },

    {
        "color": "#FFC902",
        "daysOfWeek": [0, 2, 4],
        "titre": "Manger Sain",
        "description": "Adopter une alimentation équilibrée",
        "startingDate": "Sat Nov 25 2023",
        "endingDate": "Tue Nov 28 2023",
        "occurence": 3,
        "reccurence": 1,
        "frequency": "Quotidien",
        "steps": [
          {
            "titre": "Repas équilibré",
            "description": "Préparer et manger un repas équilibré",
            "numero": 0,
            "duration": 45,
            "stepID": "c47c4c15-05f5-4e1d-926c-32a9b002eaa8"
          },
          {
            "titre": "Collation saine",
            "description": "Prendre une collation saine",
            "numero": 1,
            "duration": 15,
            "stepID": "c47c4c15-05f5-4e1d-926c-32a9b002eaa9"
          }
        ],
        "userID": "Paul",
        "icon": "healthy"
    },

    {
        "color": "#FFC902",
        "daysOfWeek": [1, 3, 5],
        "titre": "Éviter l'Alcool",
        "description": "Se priver d'alcool pendant la préparation au semi-marathon",
        "startingDate": "Sat Nov 25 2023",
        "endingDate": "Tue Nov 28 2023",
        "occurence": 1,
        "reccurence": 2,
        "frequency": "Quotidien",
        "steps": [
          {
            "titre": "Alternative sans alcool",
            "description": "Découvrir des alternatives sans alcool",
            "numero": 0,
            "duration": 20,
            "stepID": "fd272a3e-5063-4d96-8a2a-1e5eeb0f9652"
          }
        ],
        "userID": "Paul",
        "icon": "beer"
      },
    ]

    return {objectif, habits}
}

export const ObjectifPlaceholder_Meditation = () => {
    const objectif = {
        "color": "#FFFFFF",
        "titre": "Bien-Être Personnel",
        "description": "Objectif de favoriser le bien-être personnel à travers différentes habitudes",
        "icon": "meditation",
        "startingDate": "Sat Nov 25 2023",
        "endingDate": "Sat Dec 30 2023",
        "userID": "Paul"
      }
      
    
    const habits = [
        {
            "color": "#FFFFFF",
            "daysOfWeek": [0, 2, 4],
            "titre": "Méditation Quotidienne",
            "description": "Séance quotidienne de méditation",
            "startingDate": "Sat Nov 25 2023",
            "endingDate": "Sat Dec 30 2023",
            "occurence": 1,
            "reccurence": 1,
            "frequency": "Quotidien",
            "steps": [
              {
                "titre": "Méditation guidée",
                "description": "Session de méditation de 20 minutes",
                "numero": 0,
                "duration": 20,
                "stepID": "fd272a3e-5063-4d96-8a2a-1e5eeb0f9653"
              }
            ],
            "userID": "Paul",
            "icon": "meditation"
          },

          {
            "color": "#FFFFFF",
            "daysOfWeek": [1, 3],
            "titre": "Écriture Créative",
            "description": "Session d'écriture créative",
            "startingDate": "Sat Nov 25 2023",
            "endingDate": "Sat Dec 30 2023",
            "occurence": 1,
            "reccurence": 2,
            "frequency": "Quotidien",
            "steps": [
              {
                "titre": "Écriture",
                "description": "Écrire pendant 30 minutes",
                "numero": 0,
                "duration": 30,
                "stepID": "c47c4c15-05f5-4e1d-926c-32a9b002eaa7"
              },
              {
                "titre": "Révision",
                "description": "Révision et correction du texte",
                "numero": 1,
                "duration": 20,
                "stepID": "c47c4c15-05f5-4e1d-926c-32a9b002eaa8"
              }
            ],
            "userID": "Paul",
            "icon": "pencil"
          },

          {
            "color": "#FFFFFF",
            "daysOfWeek": [2],
            "titre": "Tricot Créatif",
            "description": "Séance de tricot créatif",
            "startingDate": "Sat Nov 25 2023",
            "endingDate": "Sat Dec 30 2023",
            "occurence": 2,
            "reccurence": 2,
            "frequency": "Quotidien",
            "steps": [
              {
                "titre": "Tricot",
                "description": "Tricoter pendant 45 minutes",
                "numero": 0,
                "duration": 45,
                "stepID": "78b4d0f8-c6f5-4d6e-8f87-176a88acaa23"
              },
              {
                "titre": "Choix de couleurs",
                "description": "Choisir les couleurs pour le prochain projet",
                "numero": 1,
                "duration": 15,
                "stepID": "78b4d0f8-c6f5-4d6e-8f87-176a88acaa24"
              }
            ],
            "userID": "Paul",
            "icon": "Yarn"
          }          
    ]

    return {objectif, habits}
}