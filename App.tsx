import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from 'expo-asset';
import Navigation from "./navigation";
import { Image, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { HabitsProvider } from "./data/HabitContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { habitIconRequires } from "./data/HabitIcons";
import IllustrationsList from "./data/IllustrationsList";
import * as Notifications from 'expo-notifications';
import AuthNavigator from "./navigation/AuthNavigator";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase/InitialisationFirebase";
import { UserContextProvider } from "./data/UserContext";
import { AuthContextProvider, AuthStates } from "./data/AuthContext";
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
  const [userAuthState, setUserAuthState] = useState<AuthStates>(AuthStates.AlreadyConnected);
  
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isFirstConnected, setIsFirstConnected] = useState<boolean>(true)

  const [isSplashScreenActive, setIsSplashScreenActive] = useState<boolean>(true)

  onAuthStateChanged(auth, (user) => {
    if(userAuthState !== AuthStates.Ready){
      if(user && isFirstConnected){
        if(userAuthState === AuthStates.AlreadyConnected){
          setUserAuthState(AuthStates.Ready)
        }
      }

      else {
        setUserAuthState(AuthStates.NotConnected)
        setIsFirstConnected(false)
      }
    }

    setIsLoading(false)


  });

  useEffect(() => {
    if(userAuthState === AuthStates.JustConnected){
      setUserAuthState(AuthStates.Ready)
    }
  }, [userAuthState])

  function cacheImages(images: any[]) {
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
          {userAuthState !== AuthStates.Ready ?
            <View style={{flex: 1}} onLayout={handleOnLayout}>
              <BottomSheetModalProvider>
                <AuthContextProvider setUserAuthState={setUserAuthState}>
                  <AuthNavigator/>
                </AuthContextProvider>
              </BottomSheetModalProvider>
            </View>

            :

            <UserContextProvider>
              <HabitsProvider>
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
