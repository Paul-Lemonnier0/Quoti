import { PixelRatio } from 'react-native'; 
import { Dimensions } from 'react-native'; 

const { 
  width: SCREEN_WIDTH, 
  height: SCREEN_HEIGHT 
  } = Dimensions.get('window');

export function androidPadding(a,b,c,d) {
    return {
        paddingTop: a,
        paddingRight: b ?? a,
        paddingBottom: c ?? a,
        paddingLeft: d ?? (b ?? a),
    }
}

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size, based = 'width') {
 const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale;
 return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size) => {
    return normalize(size, 'width');
  };
  //for height  pixel
  const heightPixel = (size) => {
    return normalize(size, 'height');
  };
  //for font  pixel
  const fontPixel = (size) => {
    return getHeightResponsive(size);

        // const dimension = Dimensions.get("window")[deviceDimension]
    // const valuePercentage = valueInPixels / dimension
    // return dimension * valuePercentage
  };

  const getResponsive = (valueInPixels, deviceDimension) => {
    // const dimension = Dimensions.get("window")[deviceDimension]
    // const valuePercentage = valueInPixels / dimension
    // return dimension * valuePercentage

    return normalize(valueInPixels, deviceDimension)
  }

  const getWidthResponsive = (valueInPixels) => {
    return getResponsive(valueInPixels, 'width')
  }

  const getHeightResponsive = (valueInPixels) => {
    return getResponsive(valueInPixels, 'height')
  }

  export {
    widthPixel,
    heightPixel,
    fontPixel,
    getHeightResponsive,
    getWidthResponsive,
  };