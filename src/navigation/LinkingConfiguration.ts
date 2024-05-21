import { LinkingOptions } from '@react-navigation/native';

export interface RootStackParamsList {
  Home: undefined;
  HabitudeScreen: {
    habitID: string;
    habitFrequency: string;
    goalID: string;
    currentDateString: string;
  };
  SharedHabitScreen: undefined;
  GoalDetailsScreen: undefined;
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
  AddBasicDetailsGoal: undefined;
  AddHabitsToGoal: undefined;
  ChooseColorScreenGoal: undefined;
  ChooseIconScreenGoal: undefined;
  ValidationScreenGoal: undefined;
  AddBasicDetailsDefi: undefined;
  Notifs: undefined;
}

const LinkingConfiguration: LinkingOptions<RootStackParamsList> = {
  prefixes: ['https://quoti.com', 'quoti://'],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'home',
          HabitudeScreen: 'habitude/:habitID/:habitFrequency/:goalID/:currentDateString',
          SharedHabitScreen: 'shared-habit',
          GoalDetailsScreen: 'goal-details',
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
          AddBasicDetailsGoal: 'add-basic-details-goal',
          AddHabitsToGoal: 'add-habits-to-goal',
          ChooseColorScreenGoal: 'choose-color-goal',
          ChooseIconScreenGoal: 'choose-icon-goal',
          ValidationScreenGoal: 'validation-goal',
          AddBasicDetailsDefi: 'add-basic-details-defi',
        },
      },
      Notifs: 'notifs',
    },
  },
};

export default LinkingConfiguration