import bcrypt from "bcryptjs";
import { promises as fs } from 'fs';
export const getTimeZone = (): string => { 
    return Intl.DateTimeFormat().resolvedOptions().timeZone; 
};

export const getLocale = (): string => { 
    return Intl.DateTimeFormat().resolvedOptions().locale; 
};

export function hasId<T>(obj: T): obj is T & { id: string } { 
    return typeof (obj as { id?: unknown }).id === 'string';
}

export const encrypt = async (password:string): Promise<string> =>{

    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
};

export const isMatched = async (plain:string, hash:string): Promise<boolean> =>{

    const isMatched = await bcrypt.compare(plain, hash);
    return isMatched;
};

export const saveAsJsonFile = async (filePath: string, data: any): Promise<void> =>{

    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf8');
}