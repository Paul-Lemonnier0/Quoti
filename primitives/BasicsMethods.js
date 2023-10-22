import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const generateUniqueID = () => {
    return uuidv4()
}

const listKeyIDfromArray = (array, idName, habitID = null) => {
  return array.reduce((newList, item) => {
    newList[item[idName]] = { ...item, idName: item[idName], ...(habitID && { habitID }) };
    return newList;
  }, {});
}

export {generateUniqueID, listKeyIDfromArray}