import type { TransformsStyle } from "react-native";

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

const isValidSize = (size: Size): boolean => {
  "worklet";
  return size.width > 0 && size.height > 0;
};

const defaultAnchorPoint: Point = { x: 0.5, y: 0.5 };

export const withAnchorPoint = (
  transform: TransformsStyle,
  anchorPoint: Point,
  size: Size
): TransformsStyle => {
  "worklet";

  if (!isValidSize(size)) return transform;

  let injectedTransform = transform.transform;

  if (!injectedTransform) return transform;

  if (!Array.isArray(injectedTransform)) return { transform: injectedTransform };

  if (anchorPoint.x !== defaultAnchorPoint.x && size.width) {
    const shiftTranslateX = [
      // shift before rotation
      { translateX: size.width * (anchorPoint.x - defaultAnchorPoint.x) },
    ];
    // shift after rotation
    injectedTransform = [
      ...shiftTranslateX,
      ...injectedTransform,
      { translateX: size.width * (defaultAnchorPoint.x - anchorPoint.x) },
    ];
  }

  if (anchorPoint.y !== defaultAnchorPoint.y && size.height) {
    const shiftTranslateY = [
      // shift before rotation
      { translateY: size.height * (anchorPoint.y - defaultAnchorPoint.y) },
    ];
    // shift after rotation
    injectedTransform = [
      ...shiftTranslateY,
      ...injectedTransform,
      { translateY: size.height * (defaultAnchorPoint.y - anchorPoint.y) },
    ];
  }

  return { transform: injectedTransform };
};
