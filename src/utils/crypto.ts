// DES加密模式：CBC模式/ECB模式

//@ts-ignore

// import {CryptoJS} from "crypto-js";
import * as CryptoJS from 'crypto-js';
import { LOCAL_SECRET_KEY } from '@/constant/global';


  // 加密
export  const EncryptECB = (word: string) => {
    const key = CryptoJS.enc.Utf8.parse(LOCAL_SECRET_KEY);
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }
 
  // 解密
export const DecryptECB = (word: string) => {
    const key = CryptoJS.enc.Utf8.parse(LOCAL_SECRET_KEY);
    const decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}



