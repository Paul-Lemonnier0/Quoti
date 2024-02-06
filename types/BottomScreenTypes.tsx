import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, RefObject } from "react";
import { SharedValue } from "react-native-reanimated";

interface BasicCustomBottomSheetProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    snapPoints?: Array<number|string> | SharedValue<Array<string | number>>,
    children: ReactNode
}

type BackdropBehaviorType = 'none' | 'close' | 'collapse' | undefined;
  
export {BasicCustomBottomSheetProps, BackdropBehaviorType}