import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from 'expo-asset';

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { Image, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { useCallback } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { HabitsProvider } from "./data/HabitContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ObjectifsProvider } from "./data/ObjectifContext";
import { habitIconRequires } from "./data/HabitIcons";
import { IllustrationsRequire } from "./data/IllustrationsList";

import { makeRedirectUri } from "expo-auth-session"
import { QueryParams } from "expo-auth-session/build/QueryParams"

SplashScreen.preventAutoHideAsync();

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async(url) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if(errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params;

  if(!access_token) return;
}

export default function App() {
  const colorScheme = useColorScheme();
  
  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  
  const images = habitIconRequires.concat(IllustrationsRequire)
  cacheImages(images)


  const [isLoaded] = useFonts({
    "fontLight": require("./assets/fonts/WorkSans/WorkSans-Light.ttf"),
    "fontMedium": require("./assets/fonts/WorkSans/WorkSans-Medium.ttf"),
    "fontSemiBold": require("./assets/fonts/WorkSans/WorkSans-SemiBold.ttf"),
    "fontBold": require("./assets/fonts/WorkSans/WorkSans-Bold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }


  return (
    <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
              <SafeAreaProvider onLayout={handleOnLayout}>
                <ObjectifsProvider>
                <HabitsProvider>
                  <Navigation colorScheme={colorScheme} />
                  <StatusBar />
                </HabitsProvider>
                </ObjectifsProvider>
              </SafeAreaProvider>
          </BottomSheetModalProvider>
    </GestureHandlerRootView>
    );
}
