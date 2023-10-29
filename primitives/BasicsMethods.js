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

const durationToTimeString = (duration) => {

  const hours = Math.floor(duration / 60)
  const remainingMinutes = duration % 60

  const isHourNull = hours === 0
  const isMinutesNull = remainingMinutes === 0

  const formatedDuration = isHourNull ? remainingMinutes + "min" : (hours + "h" + (isMinutesNull ? "" : remainingMinutes))

  return formatedDuration
}

const splitArrayIntoChunks = (arr, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

export {generateUniqueID, listKeyIDfromArray, durationToTimeString, splitArrayIntoChunks}