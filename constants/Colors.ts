interface Theme {
  FontGray: string;
  Font: string;
  FontContrast: string;
  Contrast: string;
  Primary: string;
  Secondary: string;
  Tertiary: string;
  Popup: string;
  Error: string;
  InputBackground: string;
  InputDisabledBackground: string;
  DisabledButtonBackground: string;
  DisabledButtonText: string;
  Selection: string;
  LinearGradientOpacityStart: string;
  LinearGradientOpacityEnd: string;
}

interface ThemeObject {
  light: Theme;
  dark: Theme;
}

const theme: ThemeObject = {
  light: {
      FontGray: "#808080",
      Font: "#071220",
      FontContrast: "#fff",
      Contrast: "#222222",
      Primary: "#f6f6f9",
      Secondary: "#fff",
      Tertiary: "#bfbfbf",
      Popup: "#f6f6f9",
      Error: "#ee1b15",
      InputBackground: "#f9f9f9",
      InputDisabledBackground: "#ededed",
      DisabledButtonBackground: "#7b7b7b",
      DisabledButtonText: "#afafaf",
      Selection: 'rgba(246, 246, 249, 0.5)',
      LinearGradientOpacityStart: 'rgba(256,256,256,0)',
      LinearGradientOpacityEnd: 'rgba(256,256,256,1)'
  },
  dark: {
      FontGray: "#696969",
      Font: "#fff",
      FontContrast: "#071220",
      Contrast: "#fff",
      Primary: "#000000",
      Secondary: "#12161b",
      Selection: 'rgba(65, 68, 71, 0.5)',
      InputBackground: "#f9f9f9",
      InputDisabledBackground: "#ededed",
      DisabledButtonBackground: "#12161b",
      DisabledButtonText: "#fff",
      Tertiary: "#414447",
      Popup: "#181b1f",
      Error: "#851405",
      LinearGradientOpacityStart: 'rgba(0,0,0,0)',
      LinearGradientOpacityEnd: 'rgba(0,0,0,1)'
  },
};

export default theme;
