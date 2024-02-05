import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from 'expo-asset';

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { Image, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { useCallback, useEffect } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { HabitsProvider } from "./data/HabitContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ObjectifsProvider } from "./data/ObjectifContext";
import { habitIconRequires } from "./data/HabitIcons";
import IllustrationsList, { IllustrationsRequire } from "./data/IllustrationsList";

import { makeRedirectUri } from "expo-auth-session"
import { QueryParams } from "expo-auth-session/build/QueryParams"
import { NormalText } from "./styles/StyledText";
import * as Notifications from 'expo-notifications';
import { useAuthentification } from "./primitives/useAuthentification";
import AuthNavigator from "./navigation/AuthNavigator";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase/InitialisationFirebase";
import { UserContextProvider } from "./data/UserContext";
import { AuthContextProvider } from "./data/AuthContext";
import { AppContextProvider } from "./data/AppContext";

SplashScreen.preventAutoHideAsync();


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export default function App() {

  const colorScheme = useColorScheme();
  const [userAuthState, setUserAuthState] = useState(1); // 0: pas connecté // 1: deja connecté (intial) // 2: viens de se connecter // 3: ready
  
  const [isLoading, setIsLoading] = useState(true)

  const [isFirstConnected, setIsFirstConnected] = useState(true)

  const [isSplashScreenActive, setIsSplashScreenActive] = useState(true)

  //auth.signOut()

  // onAuthStateChanged(auth, (user) => {
  //   if(isLoading){
  //       if(user && isUserDataLoaded) {
  //         setIsUserLoggedIn(true);
  //         setIsLoading(false)
  //       } 
        
  //       else {
  //         setIsUserDataLoaded(false)
  //       }
  //   }

  //   else{
  //     if(!user){
  //       setIsUserLoggedIn(false);
  //       setIsUserDataLoaded(false);
  //     }
  //   }
  // });

  onAuthStateChanged(auth, (user) => {
    if(userAuthState !== 3){
      if(user && isFirstConnected){
        if(userAuthState === 1){
          setUserAuthState(3)
        }
      }

      else {
        setUserAuthState(0)
        setIsFirstConnected(false)
      }
    }

    setIsLoading(false)


  });

  useEffect(() => {
    if(userAuthState === 2){
      setUserAuthState(3)
    }
  }, [userAuthState])

  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  
  const images = habitIconRequires.concat(Object.values(IllustrationsList))

  try{
    cacheImages(images)
  }
  catch(e){
  }


  const [isFontLoaded] = useFonts({
    "fontLight": require("./assets/fonts/WorkSans/WorkSans-Light.ttf"),
    "fontMedium": require("./assets/fonts/WorkSans/WorkSans-Medium.ttf"),
    "fontSemiBold": require("./assets/fonts/WorkSans/WorkSans-SemiBold.ttf"),
    "fontBold": require("./assets/fonts/WorkSans/WorkSans-Bold.ttf"),

    "fontLightPoppins": require("./assets/fonts/Poppins-Light.ttf"),
    "fontMediumPoppins": require("./assets/fonts/Poppins-Medium.ttf"),
    "fontSemiBoldPoppins": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "fontBoldPoppins": require("./assets/fonts/Poppins-Bold.ttf"),

  });

  const handleOnLayout = useCallback(async () => {
    if(isSplashScreenActive){
      if (isFontLoaded && !isLoading) {        
        await SplashScreen.hideAsync();
        setIsSplashScreenActive(false)
      }
    }
  }, [isFontLoaded, isLoading, isSplashScreenActive]);

  if ((!isFontLoaded || isLoading)) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppContextProvider>
        <SafeAreaProvider>
          <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          {userAuthState !== 3 ?
            <View style={{flex: 1}} onLayout={handleOnLayout}>
              <BottomSheetModalProvider>
                <AuthContextProvider setUserAuthState={setUserAuthState}>
                  <AuthNavigator/>
                </AuthContextProvider>
              </BottomSheetModalProvider>
            </View>

            :

            <UserContextProvider>
              <HabitsProvider setIsLoading={setIsLoading}>
                <BottomSheetModalProvider>
                  <View style={{flex: 1}} onLayout={handleOnLayout}>
                    <Navigation/>
                  </View>
                </BottomSheetModalProvider>
              </HabitsProvider>
            </UserContextProvider>
          }
          </NavigationContainer>
        </SafeAreaProvider>
      </AppContextProvider>
    </GestureHandlerRootView>
  );
}
