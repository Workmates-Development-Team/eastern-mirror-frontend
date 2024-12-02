import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function url_maker(text: string){
  return text?.toLocaleLowerCase().split(" ").join("-")
}

export function convertString(input: string) {
   
  let result = input.replace(/-/g, ' ');

  result = result.replace(/\bletters\b/, 'letter');

  return result;
}
