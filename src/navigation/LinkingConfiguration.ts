import { LinkingOptions } from '@react-navigation/native';

export interface RootStackParamsList {
  Home: undefined;
  HabitudeScreen: {
    habitID: string;
    habitFrequency: string;
    objectifID: string;
    currentDateString: string;
  };
  SharedHabitScreen: undefined;
  ObjectifDetailsScreen: undefined;
  ProfilDetailsScreen: undefined;
  ProfilSettingsScreen: undefined;
  DisplayUsersScreen: undefined;
  StatProfilScreen: undefined;
  Add: undefined;
  PreAddScreen: undefined;
  AddBasicDetails: undefined;
  ChooseColorScreen: undefined;
  ChooseIconScreen: undefined;
  AddHabitSteps: undefined;
  CreateHabitDetails: undefined;
  ValidationScreenHabit: undefined;
  AddBasicDetailsObjectif: undefined;
  AddHabitsToObjectif: undefined;
  ChooseColorScreenObjectif: undefined;
  ChooseIconScreenObjectif: undefined;
  ValidationScreenObjectif: undefined;
  AddBasicDetailsDefi: undefined;
  Notifs: undefined;
}

const LinkingConfiguration: LinkingOptions<RootStackParamsList> = {
  prefixes: ['https://daily.com', 'daily://'],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'home',
          HabitudeScreen: 'habitude/:habitID/:habitFrequency/:objectifID/:currentDateString',
          SharedHabitScreen: 'shared-habit',
          ObjectifDetailsScreen: 'objectif-details',
          ProfilDetailsScreen: 'profil-details',
          ProfilSettingsScreen: 'profil-settings',
          DisplayUsersScreen: 'display-users',
          StatProfilScreen: 'stat-profil',
        },
      },
      Add: {
        screens: {
          PreAddScreen: 'pre-add',
          AddBasicDetails: 'add-basic-details',
          ChooseColorScreen: 'choose-color',
          ChooseIconScreen: 'choose-icon',
          AddHabitSteps: 'add-habit-steps',
          CreateHabitDetails: 'create-habit-details',
          ValidationScreenHabit: 'validation-habit',
          AddBasicDetailsObjectif: 'add-basic-details-objectif',
          AddHabitsToObjectif: 'add-habits-to-objectif',
          ChooseColorScreenObjectif: 'choose-color-objectif',
          ChooseIconScreenObjectif: 'choose-icon-objectif',
          ValidationScreenObjectif: 'validation-objectif',
          AddBasicDetailsDefi: 'add-basic-details-defi',
        },
      },
      Notifs: 'notifs',
    },
  },
};

export default LinkingConfiguration