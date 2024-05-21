import React from 'react'
import { withAnchorPoint } from '../styles/utils';
import { Extrapolation, interpolate } from 'react-native-reanimated';

export const useCubeCarouselAnimation = (pageHeight: number, pageWidth: number) => {
    const animationStyle = (value: number) => { "worklet";
          const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, -1000]);
    
          const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-pageWidth + 55, 0, pageWidth -55],
            Extrapolation.CLAMP,
          );
    
          const scale = interpolate(
            value,
            [-1, 0, 1],
            [0.65, 1, 0.65],
            Extrapolation.CLAMP,
          );
    
          const perspective = pageWidth * 2
    
          const rotateY = `${interpolate(
            value,
            [-1, 0, 1],
            [-90, 0, 90],
            Extrapolation.CLAMP,
          )}deg`;
    
          const transform = {
            transform: [
              { scale },
              { translateX },
              { perspective },
              { rotateY },
            ],
          };
    
          return {
            ...withAnchorPoint(
              transform,
              { x: 0.5, y: 0.5 },
              { width: pageWidth, height: pageHeight },
            ),
            zIndex,
          };
        }

    return animationStyle
}
