import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

export function displayTree(node: any, indent = 0) {
  const spaces = '  '.repeat(indent);

  for (const key in node) {
    if (typeof node[key] === 'object') {
      console.log(`${spaces}${key}: `);
      displayTree(node[key], indent + 1);
    } else {
      console.log(`${spaces}${key}: ${JSON.stringify(node[key])}`);
    }
  }
}

const generateUniqueID = (): string => {
    return uuidv4()
}

interface KeyValueList {
  [key: string]: any
}

const listKeyIDfromArray = (array: Array<Object>, idName: string, habitID: string | undefined): KeyValueList => {

  return array.reduce((newList, item) => {
    if(habitID){
      newList[item[idName]] = { ...item, habitID };
      return newList
    }

    newList[item[idName]] = { ...item };
    return newList;
  }, {});
}

const durationToTimeString = (duration: number): string => {

  const hours = Math.floor(duration / 60)
  const remainingMinutes = duration % 60

  const isHourNull = hours === 0
  const isMinutesNull = remainingMinutes === 0

  const formatedDuration = isHourNull ? remainingMinutes + "min" : (hours + "h" + (isMinutesNull ? "" : remainingMinutes))

  return formatedDuration
}


const splitArrayIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

export {generateUniqueID, listKeyIDfromArray, durationToTimeString, splitArrayIntoChunks}