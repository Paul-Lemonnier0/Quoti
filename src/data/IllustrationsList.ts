export enum IllustrationsType {
    NothingPlanned = "NothingPlanned",
    Validation = "Validation",
    Education = "Education",
    Creative = "Creative",
    WorkingFullSpeed = "WorkingFullSpeed",
    Traveler = "Traveler",
    WorkingBench = "WorkingBench"
}

type IllustrationsList = {[illustration in IllustrationsType]: any}

const IllustrationsList: IllustrationsList = {
    NothingPlanned: require('../img/Illustration/Light_theme/Workout_Break.png'),
    Validation: require('../img/Illustration/Light_theme/Idea.png'),
    Education: require('../img/Illustration/Light_theme/Education.png'),
    Creative: require('../img/Illustration/Light_theme/Creative.png'),
    WorkingFullSpeed: require('../img/Illustration/Light_theme/WorkingFullSpeed.png'),
    Traveler: require('../img/Illustration/Light_theme/Traveler.png'),
    WorkingBench: require('../img/Illustration/Light_theme/WorkingBench.png'),
};

export default IllustrationsList;
