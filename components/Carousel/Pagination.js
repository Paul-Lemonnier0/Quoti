import { View } from "react-native"
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { useThemeColor } from "../Themed"

export default Pagination = ({length, currentIndex, maxIndicator = 3}) => {
    
    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")

    return(
        <View style={{height: 8, marginVertical: 0}}>
            <AnimatedDotsCarousel
                length={length}
                currentIndex={currentIndex}
                maxIndicators={maxIndicator}
                interpolateOpacityAndColor={true}

                activeIndicatorConfig={{
                    color: font,
                    margin: 5,
                    opacity: 1,
                    size: 8,
                }}

                inactiveIndicatorConfig={{
                    color: fontGray,
                    margin: 5,
                    opacity: 1,
                    size: 8,
                }}

                decreasingDots={[
                {
                    config: { 
                        color: 'white', 
                        margin: 5, 
                        opacity: 0.5,
                        size: 6 
                    },
                    quantity: 1,
                    config: { 
                        color: 'white', 
                        margin: 5, 
                        opacity: 0.5,
                        size: 4 
                    },
                    
                    quantity: 1,
                }
                ]}
            />
        </View>
    )
}