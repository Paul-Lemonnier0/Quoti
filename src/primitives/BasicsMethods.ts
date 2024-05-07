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

export interface KeyValueList {
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

  if(duration ===0) return "--"

  const hours = Math.floor(duration / 60)
  const remainingMinutes = duration % 60
  const extra0 = remainingMinutes < 10 ? "0" : ""

  const isHourNull = hours === 0
  const isMinutesNull = remainingMinutes === 0

  const formatedDuration = isHourNull ? remainingMinutes + "min" : (hours + "h" + (isMinutesNull ? "" : (extra0 + remainingMinutes)))

  return formatedDuration
}

const getMinutesFromDuration = (duration: number): number => {
  return duration % 60
}

const getHoursFromDuration = (duration: number): number => {
  return Math.floor(duration / 60);
}


const splitArrayIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

const isTextInputValueValid = (value: string | undefined) => {
  return value && value.trim().length > 0
}

function toISOStringWithoutTimeZone(date: Date): string {
  if (date == null) return date;
  var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  var correctDate = new Date(timestamp);
  correctDate.setUTCHours(0, 0, 0, 0);
  return correctDate.toISOString().substring(0,10);
}

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export function hexToRGBObject(hex: string, alpha: number): {r: number, g: number, b: number} {
  const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

      return {r,g,b}
}

const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

console.log(rgbToHex(255, 51, 255));

//"#ff33ff"

export const sortByKey = (a: any, b: any, key: string, ascending = true): number => {
  if (key in a && key in b) {
      if (a[key] < b[key]) {
          return ascending ? -1 : 1;
      } else if (a[key] > b[key]) {
          return ascending ? 1 : -1;
      } else {
          return 0;
      }
  } else {
      console.log("La clé spécifiée n'existe pas dans au moins l'un des objets.");
      return 0;
  }
};

export const sortString = (a: string, b: string, ascending = true): number => {
  return ascending ? a.localeCompare(b) : b.localeCompare(a)
}

export const sortDate = (a: Date, b: Date, ascending = true): number => {
  return ascending ? a.getTime()-b.getTime() : b.getTime()-a.getTime();
}

export {
  generateUniqueID, 
  listKeyIDfromArray, 
  durationToTimeString, 
  splitArrayIntoChunks, 
  getMinutesFromDuration, 
  getHoursFromDuration,
  isTextInputValueValid,
  toISOStringWithoutTimeZone
}