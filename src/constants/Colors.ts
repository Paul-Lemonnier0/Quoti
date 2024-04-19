export interface Theme {
  FontGray: string;
  Font: string;
  FontContrast: string;
  Contrast: string;
  Primary: string;
  Secondary: string;
  SecondaryLowOpacity: string,
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
  ContrastLowOpacity: string
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
      SecondaryLowOpacity: "rgba(255, 255, 255, 0.5)",
      ContrastLowOpacity: "rgba(0, 0, 0, 0.25)",
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
      SecondaryLowOpacity: "rgba(18, 22, 27, 0.5)",
      ContrastLowOpacity: "rgba(255, 255, 255, 0.25)",
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
      // FontGray: "#7c7c7c",
      // Font: "#fff",
      // FontContrast: "#091823",
      // Contrast: "#fafafa",
      // Primary: "#1a1a1a",
      // Secondary: "#1e2126",
      // SecondaryLowOpacity: "rgba(30, 33, 38, 0.5)",
      // ContrastLowOpacity: "rgba(250, 250, 250, 0.25)",
      // Selection: 'rgba(65, 68, 71, 0.5)',
      // InputBackground: "#f0f0f0",
      // InputDisabledBackground: "#e0e0e0",
      // DisabledButtonBackground: "#1e2126",
      // DisabledButtonText: "#fafafa",
      // Tertiary: "#464a4f",
      // Popup: "#212529",
      // Error: "#b71c1c",
      // LinearGradientOpacityStart: 'rgba(0,0,0,0)',
      // LinearGradientOpacityEnd: 'rgba(0,0,0,1)'
  },
};

export default theme;
