import * as Haptics from 'expo-haptics';

const BottomScreenOpen_Impact = () => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)};
const Warning_Impact = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)};
const Success_Impact = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)};
const Error_Impact = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)};

export {
    BottomScreenOpen_Impact,
    Success_Impact,
    Warning_Impact,
    Error_Impact
}