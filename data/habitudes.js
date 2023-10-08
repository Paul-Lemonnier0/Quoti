const getRandomPercentage = () => Math.floor(Math.random() * 100);

const habits = [
  { titre: "Course à pied", icon: "run", description: "Rester actif avec la course à pied quotidienne." },
  { titre: "Manger sainement", icon: "healthy", description: "Adopter un mode de vie alimentaire sain." },
  { titre: "Lire", icon: "books", description: "Lire un livre chaque jour." },
  { titre: "Méditation", icon: "meditation", description: "Pratiquer la méditation pour la paix intérieure." },
  { titre: "Faire du sport", icon: "bike", description: "Participer régulièrement à des activités sportives." },
  { titre: "Étudier", icon: "books", description: "Consacrer du temps à l'apprentissage continu." },
  { titre: "Yoga", icon: "meditation", description: "Expérimenter les bienfaits de la pratique du yoga." },
  { titre: "Peindre", icon: "pencil", description: "Exprimer sa créativité à travers la peinture." },
  { titre: "Marche", icon: "run", description: "Faire une promenade quotidienne pour l'air frais et l'exercice." },
  { titre: "Écrire", icon: "pencil", description: "Écrire régulièrement pour libérer ses pensées." },
];


const colors = [
  "#28AD5A",
  "#6B46CA",
  "#D34258",
  "#10A0CF",
  "#D3AD0A",
  "#E067BF",
  "#ff00ff",
  "#E97136",
];

const states = ["done", "todo", "cancel", "skip"];

// Function to generate coherent steps for a habit
const generateSteps = (totalSteps) => {
  const steps = [];
  for (let i = 1; i <= totalSteps; i++) {
    steps.push({
      stepNumber: i,
      title: `Etape ${i}`,
      description: `Description for Etape ${i}`,
    });
  }
  return steps;
};

const generateRandomHabitudes = () => {
  return habits.map(({ titre, icon, description }, index) => {
    const totalSteps = Math.floor(Math.random() * 4) + 1; // Let's limit steps to 1 to 4 for coherence

    return {
      titre: titre,
      pourcentage: getRandomPercentage(),
      color: colors[index % colors.length],
      state: states[Math.floor(Math.random() * states.length)],
      description : description,
      totalSteps: totalSteps,
      icon: icon,
      doneSteps: Math.floor(Math.random() * totalSteps) + 1,
      id: (index + 1).toString(),
      steps: generateSteps(totalSteps), // Generate coherent steps for each habit
    };
  });
};

export default generateRandomHabitudes;

const imagePaths = [
  require('../img/TestVrai.png'),
  require('../img/FreeFacesPack/x500/02m.jpg'),
  require('../img/FreeFacesPack/x500/06w.jpg'),
  require('../img/FreeFacesPack/x500/04w.jpg'),
  require('../img/FreeFacesPack/x500/05w.jpg'),
  require('../img/FreeFacesPack/x500/06w.jpg'),
  require('../img/FreeFacesPack/x500/07w.jpg'),
  require('../img/FreeFacesPack/x500/08m.jpg'),
  require('../img/FreeFacesPack/x500/09w.jpg'),
  require('../img/FreeFacesPack/x500/10m.jpg'),
  require('../img/FreeFacesPack/x500/11m.jpg'),
  require('../img/FreeFacesPack/x500/12m.jpg'),
  require('../img/FreeFacesPack/x500/13m.jpg'),
  require('../img/FreeFacesPack/x500/14m.jpg'),
  require('../img/FreeFacesPack/x500/15w.jpg'),
  require('../img/FreeFacesPack/x500/15w.jpg'),
  require('../img/FreeFacesPack/x500/16w.jpg'),
  require('../img/FreeFacesPack/x500/17w.jpg'),
  require('../img/FreeFacesPack/x500/18w.jpg'),
  require('../img/FreeFacesPack/x500/19m.jpg'),
  require('../img/FreeFacesPack/x500/20w.jpg'),
  require('../img/FreeFacesPack/x500/21w.jpg'),
  require('../img/FreeFacesPack/x500/22w.jpg'),
  require('../img/FreeFacesPack/x500/23w.jpg'),
  require('../img/FreeFacesPack/x500/24w.jpg'),
  require('../img/FreeFacesPack/x500/25w.jpg'),
  require('../img/FreeFacesPack/x500/26m.jpg'),

];

const people = [
  { firstName: "Paul", lastName: "Martin", pseudo: "paul007" },
  { firstName: "Emma", lastName: "Johnson", pseudo: "emma22" },
  { firstName: "Louis", lastName: "Smith", pseudo: "lou33" },
  { firstName: "Chloe", lastName: "Williams", pseudo: "chlo44" },
  { firstName: "Gabriel", lastName: "Anderson", pseudo: "gabi55" },
  { firstName: "Ines", lastName: "Brown", pseudo: "inny66" },
  { firstName: "William", lastName: "Lee", pseudo: "will77" },
  { firstName: "Olivia", lastName: "Miller", pseudo: "oliv88" },
  { firstName: "Thomas", lastName: "Davis", pseudo: "tommy99" },
  { firstName: "Charlotte", lastName: "Wilson", pseudo: "char100" },
  { firstName: "Leo", lastName: "Taylor", pseudo: "leo101" },
  { firstName: "Sophia", lastName: "Clark", pseudo: "soph123" },
  { firstName: "Maxime", lastName: "Lewis", pseudo: "max45" },
  { firstName: "Alice", lastName: "Scott", pseudo: "aliiice" },
  { firstName: "Hugo", lastName: "White", pseudo: "hugohugo" },
  { firstName: "Julia", lastName: "Thomas", pseudo: "julietta" },
  { firstName: "Alexandre", lastName: "Roberts", pseudo: "alex33" },
  { firstName: "Eva", lastName: "Hall", pseudo: "eviee" },
  { firstName: "Nicolas", lastName: "Baker", pseudo: "nic99" },
  { firstName: "Zoe", lastName: "Green", pseudo: "zoegirl" },
  { firstName: "Mathis", lastName: "Adams", pseudo: "mathis99" },
  { firstName: "Lena", lastName: "King", pseudo: "lenaqueen" },
  { firstName: "Raphael", lastName: "Ward", pseudo: "raph14" },
  { firstName: "Camille", lastName: "Cook", pseudo: "camcam" },
  { firstName: "Arthur", lastName: "Hughes", pseudo: "art88" },
  { firstName: "Lea", lastName: "Bell", pseudo: "lea77" }
];

const generateFriends = () => {

  const friends = []

  people.map((user, index) => {
    friends.push(
      {
        nom: user.lastName, 
        prenom: user.firstName, 
        pseudo: user.pseudo,
        image: imagePaths[index], 
        id: index
      })
    })

  for(let i = 0; i<26; ++i)
  { 
  }

  return friends
}

const generateRandomContributors = (habitudes) => {

  const contributors = [];

  habitudes.forEach((habitude) => {
    const randomContributorsCount = 10;

    for (let i = 0; i < randomContributorsCount; i++) {

      const randomFriend = Friends[i];

      const contributor = {
        nom: randomFriend.nom,
        pourcentage: getRandomPercentage(),
        habitude: {
          titre: habitude.titre,
          doneSteps: Math.floor(Math.random() * habitude.totalSteps),
          totalSteps: habitude.totalSteps
        },
        image: randomFriend.image,
        id: i.toString()
      };

      contributors.push(contributor);
    }
  });

  return contributors;
};

const Habitudes = generateRandomHabitudes();
const Friends = generateFriends()
const ContributorsHabits = generateRandomContributors(Habitudes);

export { Habitudes, ContributorsHabits, Friends, colors };