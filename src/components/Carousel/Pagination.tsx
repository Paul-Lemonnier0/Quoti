import { View } from "react-native"
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { useThemeColor } from "../Themed"
import { FC, useContext } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";

export interface PaginationProps {
    length: number,
    currentIndex: number,
    maxIndicator?: number
}

const Pagination: FC<PaginationProps> = ({length, currentIndex, maxIndicator = 3}) => {
    const {theme} = useContext(AppContext)

    const fontGray = useThemeColor(theme, "FontGray")
    const font = useThemeColor(theme, "Font")

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
                        size: 4 
                    },
                    quantity: 1,
                }
                ]}
            />
        </View>
    )
}

export default Pagination