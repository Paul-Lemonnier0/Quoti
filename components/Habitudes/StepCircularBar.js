import { StyleSheet, View, Image } from "react-native";
import { useThemeColor } from "../Themed";
import { useState } from "react";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import CircularProgress from "react-native-circular-progress-indicator";
import { NormalText } from "../../styles/StyledText";
import { Feather } from "@expo/vector-icons";
import HabitIcons from "../../data/HabitIcons";

export const StepCircularBar = ({ habit, isFinished, tall, otherImage, secondaryInactiveColor }) => {


  const { color } = habit;

  const steps = Object.values(habit.steps)
  const doneSteps = habit.doneSteps

  const totalSteps = steps.length

  const imageToDisplay = otherImage ? otherImage : HabitIcons[habit.icon]

  const isGiant = tall ? true : false

  const strokeWidth = 4

  const pourcentage = (doneSteps * 100) / totalSteps 

  const primary = useThemeColor({}, "Primary");
  const secondary = useThemeColor({}, "Secondary");

  const inActiveColor = secondaryInactiveColor ? secondary : primary 

  const [isLoading, setIsLoading] = useState(true);

  const handleStopLoad = () => {
    setIsLoading(false);
  };

  const radius = isGiant ? 35 : 28; // Rayon du cercle
  const angleTotal = 2 * Math.PI * (radius + 2.5); // Angle total en radians

  const circumference = totalSteps === 1 ? angleTotal : angleTotal - angleTotal * 0.025 * totalSteps;
  const width = (circumference / totalSteps)


  return (
    <View style={styles.container}>
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
          }}
      >
        <View style={styles.imageContainer}>
          {!isFinished && <Image
            onLoadEnd={handleStopLoad}
            style={[
              styles.imageStyle,
              {
                backgroundColor: isLoading ? primary : "transparent",
              },
            ]}
            source={imageToDisplay}
          />}

          {isFinished && <Feather name="check" size={30} color={color}/>}

        </View>
      </CircularProgressBase>
    </View>
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
    aspectRatio: 1,
    width: "50%",
    height: "50%",
  },
});