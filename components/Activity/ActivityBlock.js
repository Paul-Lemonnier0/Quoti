import { useThemeColor } from "../../components/Themed"
import { StyleSheet, View } from "react-native";
import cardStyle from "../../styles/StyledCard";
import { TouchableOpacity } from "react-native";

export const ActivityBlock = (props) => {

    const Habitudes = []

    const Dot = ({color, isDone}) => {

        let backgroundColor
        let opacity = 1

        switch (isDone){
          case 0:
            backgroundColor = color
            borderColor = color
            break;
          
          case 1:
            backgroundColor = primary
            borderColor = primary
            break;

          case 2:
            backgroundColor = primary
            opacity = 0.4
            break;
        }
        

        return(
          <TouchableOpacity style={[styles.dot, {backgroundColor: backgroundColor, borderColor: backgroundColor, opacity: opacity}]} />
        )
        };
      
      const LineOfDots = ({color}) => {
        const numberOfDots = 16;
      
        const renderDots = () => {
          const dots = [];
          for (let i = 0; i < numberOfDots; i++) {

            const isDone = Math.floor(Math.random() * 3)
            dots.push(<Dot key={i} color={color} isDone={isDone}/>);
          }
          return dots;
        };
      
        return (
          <View style={{display: "flex", flexDirection: 'row', justifyContent:"space-between"}}>
            {renderDots(color)}
          </View>
        );
      };
      
      const SquareOfDots = () => {
        const numberOfLines = Habitudes.length

        const renderLines = () => {
          const lines = [];
          for (let i = 0; i < numberOfLines; i++) {
            lines.push(<LineOfDots key={i} color={Habitudes[i].color}/>);
          }
          return lines;
        };

        return (
          <View style={{display: "flex", flexDirection: 'column', gap: 10}}>
            {renderLines()}
          </View>
        );
      }


      const testData = []

      for(let i = 0; i<15; ++i)
      {
        testData.push(i)
      }

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const stylesCard = cardStyle()

    return(
        <TouchableOpacity onPress={props.onPress} style={[{padding: 20, backgroundColor: secondary}, stylesCard.card]}>        
            {SquareOfDots()}
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    dot: {

        padding: 5, marginHorizontal: 2,
        borderRadius: 50,
        borderWidth: 1
      },
})