import { PixelRatio, ViewStyle } from 'react-native'; 
import { Dimensions } from 'react-native'; 

const { 
  width: SCREEN_WIDTH, 
  height: SCREEN_HEIGHT 
  } = Dimensions.get('window');

export function androidPadding(a: number, b: number,c: number, d: number): ViewStyle {
    return {
        paddingTop: a,
        paddingRight: b ?? a,
        paddingBottom: c ?? a,
        paddingLeft: d ?? (b ?? a),
    }
}

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size: number, based: "width" | "height" = 'width'): number {
 const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale;
 return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size: number): number => {
    return normalize(size, 'width');
  };

const heightPixel = (size: number): number => {
  return normalize(size, 'height');
};

const fontPixel = (size: number): number => {
  return getHeightResponsive(size);
};

const getResponsive = (valueInPixels: number, deviceDimension: "width" | "height"): number => {
  return normalize(valueInPixels, deviceDimension)
}

  const getWidthResponsive = (valueInPixels: number): number => {
    return getResponsive(valueInPixels, 'width')
  }

  const getHeightResponsive = (valueInPixels: number): number => {
    return getResponsive(valueInPixels, 'height')
  }

  export {
    widthPixel,
    heightPixel,
    fontPixel,
    getHeightResponsive,
    getWidthResponsive,
  };