export interface Theme {
  FontGray: string;
  Font: string;
  FontContrast: string;
  Contrast: string;
  Primary: string;
  Secondary: string;
  Tertiary: string;
  InputDisabledBackground: string;
  DisabledButtonBackground: string;
  DisabledButtonText: string;
  Selection: string;
  LinearGradientOpacityStart: string;
  LinearGradientOpacityEnd: string;
  ContrastLowOpacity: string,

  BottomTabBar: string,

  Error: string,
  Success: string,

  MissedDay: string,
  ScheduledDay: string,
  NoneDay: string
}

export interface ThemeObject {
  light: Theme;
  dark: Theme;
}

const theme: ThemeObject = {
  light: {
      FontGray: "#808080",
      Font: "#071220",
      FontContrast: "#fff",
      Contrast: "#000000",

      Primary: "#f6f6f9",
      Secondary: "#fff",
      Tertiary: "#bfbfbf",

      ContrastLowOpacity: "rgba(0, 0, 0, 0.25)",
      InputDisabledBackground: "#ededed",
      DisabledButtonBackground: "#7b7b7b",
      DisabledButtonText: "#afafaf",

      Selection: 'rgba(191, 191, 191, 0.5)',

      Error: "#ee1b15",
      Success: "#4DAB9A",

      BottomTabBar: "#121212",
      LinearGradientOpacityStart: 'rgba(256,256,256,0)',
      LinearGradientOpacityEnd: 'rgba(256,256,256,0.5)',
      
      MissedDay: "#6B6B6B",
      ScheduledDay: "#B8B8B8",
      NoneDay: "#E7E7E7",
  },

  dark: {
      FontGray: "#979A9B",
      Font: "#fff",
      FontContrast: "#071220",
      Contrast: "#fff",

      Primary: "#1c1d1f",
      Secondary: "#2e3133",
      Tertiary: "#414447",
      
      ContrastLowOpacity: "rgba(255, 255, 255, 0.25)",
      InputDisabledBackground: "#ededed",
      DisabledButtonBackground: "#12161b",
      DisabledButtonText: "#fff",
      
      Selection: 'rgba(65, 68, 71, 0.5)',

      Error: "#FF7369",
      Success: "#4DAB9A",

      BottomTabBar: "#0D0D0D",
      LinearGradientOpacityStart: 'rgba(0,0,0,0)',
      LinearGradientOpacityEnd: 'rgba(0,0,0,1)',

      MissedDay: "#131518",
      ScheduledDay: "#26292e",
      NoneDay: "#212224",
  },
};

export default theme;
