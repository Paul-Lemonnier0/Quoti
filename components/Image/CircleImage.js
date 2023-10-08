import { Image } from "react-native"

export default ImageCircle = ({src, height, width, background}) => {

    return(
    <Image source={require(src)} style={{height: height, width: width, backgroundColor: background}}/>
    )

}