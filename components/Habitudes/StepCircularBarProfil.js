import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useThemeColor } from "../Themed";
import { useState } from "react";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import CircularProgress from "react-native-circular-progress-indicator";
import { LittleNormalText, NormalText, SubText, TitleText } from "../../styles/StyledText";
import { Feather } from "@expo/vector-icons";
export const StepCircularBarProfil = ({ habit, profil, isFinished, secondaryInactiveColor, index }) => {


  const { color, totalSteps } = habit;
  const {doneSteps} = profil.habitude

  const strokeWidth = 4

  const pourcentage = (doneSteps * 100) / totalSteps 

  const primary = useThemeColor({}, "Primary");
  const secondary = useThemeColor({}, "Secondary");

  const inActiveColor = secondaryInactiveColor ? secondary : primary 

  const [isLoading, setIsLoading] = useState(true);

  const handleStopLoad = () => {
    setIsLoading(false);
  };

  const radius = 35; // Rayon du cercle
  const angleTotal = 2 * Math.PI * (radius + 2.5); // Angle total en radians

  const circumference = totalSteps === 1 ? angleTotal : angleTotal - angleTotal * 0.025 * totalSteps;
  const width = (circumference / totalSteps)

  return (
    <TouchableOpacity style={styles.container} accessibilityLabel={profil.id} key={profil.id}>
      <CircularProgressBase
        value={pourcentage === 100 ? 100 : pourcentage - 0.5}
        radius={radius}
        activeStrokeWidth={strokeWidth}
        inActiveStrokeWidth={strokeWidth}
        activeStrokeColor={pourcentage <= 0 ? primary : color}
        inActiveStrokeColor={inActiveColor}
        strokeLinecap="butt"
        rotation={2} duration={250}
        
        dashedStrokeConfig={{
            count: totalSteps,
            width: width,
          }}>

        <View style={styles.imageContainer}>
          {!isFinished && <Image
            onLoadEnd={handleStopLoad}
            style={[
              styles.imageStyle,
              {
                backgroundColor: isLoading ? primary : "transparent",
              },
            ]}
            source={profil.image}
          />}

          {isFinished && <Feather name="check" size={30} color={color}/>}

        </View>

      </CircularProgressBase>
      <LittleNormalText text={profil.nom}/>
    </TouchableOpacity>
  );
};

export const AddProfilCircularButton = ({habit, secondaryInactiveColor, id}) => {

    
  const { totalSteps } = habit;

  const strokeWidth = 4

  const primary = useThemeColor({}, "Primary");
  const secondary = useThemeColor({}, "Secondary");
  const fontGray = useThemeColor({}, "FontGray");

  const inActiveColor = secondaryInactiveColor ? secondary : primary 

  const [isLoading, setIsLoading] = useState(true);

  const handleStopLoad = () => {
    setIsLoading(false);
  };

  const radius = 35; // Rayon du cercle
  const angleTotal = 2 * Math.PI * (radius + 2.5); // Angle total en radians

  const circumference = totalSteps === 1 ? angleTotal : angleTotal - angleTotal * 0.025 * totalSteps;
  const width = (circumference / totalSteps)

  return (
    <TouchableOpacity style={styles.container} accessibilityLabel={100000000000}>
      <CircularProgressBase
        value={0}
        radius={radius}
        activeStrokeWidth={strokeWidth}
        inActiveStrokeWidth={strokeWidth}
        activeStrokeColor={primary}
        inActiveStrokeColor={inActiveColor}
        strokeLinecap="butt"
        rotation={2} duration={250}
        key={id}
        dashedStrokeConfig={{
            count: totalSteps,
            width: width,
          }}>

          <View style={{backgroundColor:secondary, borderRadius: 50, width: "80%", height: "80%", 
          display:"flex", alignItems: "center", justifyContent:"center"}}>
                <Feather name="plus" size={25} color={fontGray}/>
          </View>

      </CircularProgressBase>
      <SubText text="Inviter" style={{fontSize: 14}}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageStyle: {
    alignSelf: "center",
    justifyContent: "center",
    resizeMode: "contain",
    aspectRatio: 1, borderRadius: 50,
    width: "80%",
    height: "80%",
  },
});