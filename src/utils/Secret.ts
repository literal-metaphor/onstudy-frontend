import createCipherObject from 'json-cipher-value';

const secret = "onStudySecret";
const cipherObject = createCipherObject(secret);

export const encrypt = (data) => {
  return cipherObject.perform('cipher', data);
}

export const decrypt = (data) => {
  return cipherObject.perform("decipher", data);
}