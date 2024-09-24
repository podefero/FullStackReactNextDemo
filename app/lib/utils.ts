import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function add<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error adding item to localStorage:', error);
  }
}

export function remove<T>(key: string, predicate: (item: T) => boolean): void {
  try {
    const existingData = localStorage.getItem(key);
    if (existingData) {
      let dataArray: T[] = JSON.parse(existingData);
      dataArray = dataArray.filter(item => !predicate(item));
      localStorage.setItem(key, JSON.stringify(dataArray));
    }
  } catch (error) {
    console.error('Error removing item from localStorage:', error);
  }
}

