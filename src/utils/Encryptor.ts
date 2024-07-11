import { PlainData } from "./types/PlainData";

/**
 * Shifts a character by the specified amount.
 * @param {string} char - The character to shift.
 * @param {number} shift - The amount to shift the character by.
 * @returns {string} The shifted character.
 */
const shiftChar = (char: string, shift: number): string => {
    const charCode = char.charCodeAt(0);
    return String.fromCharCode(charCode + shift);
};

/**
 * Processes a string by shifting each character by the specified amount.
 * @param {string} str - The string to process.
 * @param {number} shift - The amount to shift each character by.
 * @returns {string} The processed string.
 */
const processString = (str: string, shift: number): string => {
    return str.split('').map(char => shiftChar(char, shift)).join('');
};

/**
 * Processes data by recursively shifting string values.
 * @param {PlainData | PlainData[]} data - The data to process.
 * @param {number} shift - The amount to shift each character by.
 * @returns {PlainData | PlainData[]} The processed data.
 */
const processData = (data: PlainData | PlainData[], shift: number): PlainData | PlainData[] => {
    if (Array.isArray(data)) {
        return data.map(item => processData(item as PlainData, shift) as PlainData);
    }

    const result: PlainData = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (typeof value === 'object' && value !== null) {
                result[key] = processData(value as PlainData, shift);
            } else if (typeof value === 'string') {
                result[key] = processString(value, shift);
            } else {
                result[key] = value;
            }
        }
    }

    return result;
};

/**
 * Encrypts the values of an object by shifting each string value by 4.
 * @param {PlainData} obj - The object to encrypt.
 * @returns {PlainData} The encrypted object.
 */
export const encryptValues = (obj: PlainData): PlainData => {
    return processData(obj, 4) as PlainData;
};

/**
 * Decrypts the values of an object by shifting each string value by -4.
 * @param {PlainData} obj - The object to decrypt.
 * @returns {PlainData} The decrypted object.
 */
export const decryptValues = (obj: PlainData): PlainData => {
    return processData(obj, -4) as PlainData;
};

/**
 * Encrypts an array of plain objects by encrypting each object's values.
 * @param {PlainData[]} arr - The array of plain objects to encrypt.
 * @returns {PlainData[]} The encrypted array of plain objects.
 */
export const encryptData = (arr: PlainData[]): PlainData[] => {
    return arr.map(obj => encryptValues(obj));
};

/**
 * Decrypts an array of plain objects by decrypting each object's values.
 * @param {PlainData[]} arr - The array of plain objects to decrypt.
 * @returns {PlainData[]} The decrypted array of plain objects.
 */
export const decryptData = (arr: PlainData[]): PlainData[] => {
    return arr.map(obj => decryptValues(obj));
};

// Example usage
// const data = [
//     {
//         id: "5bd1cb8c-a2e9-4f8b-a46e-f8abc484f352",
//         classroom_id: "c6562a15-7c19-4011-ac59-5ad30b717cd4",
//         title: "test",
//         description: "test",
//         deadline: "2024-07-07",
//         created_at: "2024-07-07T03:12:19.000000Z",
//         updated_at: "2024-07-07T03:12:19.000000Z",
//         questions: [
//             {
//                 id: "7c8fe2e4-98bf-4b6b-af54-90aa3ed456de",
//                 assignment_id: "5bd1cb8c-a2e9-4f8b-a46e-f8abc484f352",
//                 question: "Tuliskan pertanyaan di sini",
//                 created_at: "2024-07-07T03:12:19.000000Z",
//                 updated_at: "2024-07-07T03:12:19.000000Z",
//                 answers: [
//                     {
//                         id: "bb5f971c-4593-4c2e-b82f-7e91bd4de6fe",
//                         question_id: "7c8fe2e4-98bf-4b6b-af54-90aa3ed456de",
//                         answer: "Jawaban 1",
//                         right_answer: true,
//                         created_at: "2024-07-07T03:12:19.000000Z",
//                         updated_at: "2024-07-07T03:12:19.000000Z"
//                     },
//                     {
//                         id: "fbcc3f0b-1b38-4750-b15c-1b2416891dac",
//                         question_id: "7c8fe2e4-98bf-4b6b-af54-90aa3ed456de",
//                         answer: "Jawaban 2",
//                         right_answer: false,
//                         created_at: "2024-07-07T03:12:19.000000Z",
//                         updated_at: "2024-07-07T03:12:19.000000Z"
//                     },
//                     {
//                         id: "320e8edb-f990-4e15-ab21-3d8a29acf3d1",
//                         question_id: "7c8fe2e4-98bf-4b6b-af54-90aa3ed456de",
//                         answer: "Jawaban 3",
//                         right_answer: false,
//                         created_at: "2024-07-07T03:12:19.000000Z",
//                         updated_at: "2024-07-07T03:12:19.000000Z"
//                     },
//                     {
//                         id: "2bba8b94-174f-402c-b83c-1116cc0d83f0",
//                         question_id: "7c8fe2e4-98bf-4b6b-af54-90aa3ed456de",
//                         answer: "Jawaban 4",
//                         right_answer: false,
//                         created_at: "2024-07-07T03:12:19.000000Z",
//                         updated_at: "2024-07-07T03:12:19.000000Z"
//                     }
//                 ]
//             }
//         ]
//     }
// ];

// const encryptedData = encryptData(data);
// console.log("Encrypted Data:", encryptedData);

// const decryptedData = decryptData(encryptedData);
// console.log("Decrypted Data:", decryptedData);
