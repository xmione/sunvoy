/*
    To Test:
                npx tsx app/utils/createUsers.ts
*/

import { faker } from '@faker-js/faker';
import { encrypt, saveAsJsonFile } from '../lib/globalfunctions';
import { User } from '../lib/definitions';

export default async function createUsers(): Promise<void> {
    const users: User[] = [];

    users.push({
        id: faker.string.uuid(),
        firstname: "John",
        lastname: "Doe",
        email: "demo@example.org",
        password: await encrypt("test") 
    });

    for (let i = 0; i < 19; i++) {
        users.push({
            id: faker.string.uuid(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password: await encrypt("test") 
        });
    }

    console.log(users); 

    saveAsJsonFile('./app/data/users.json', users);
}

createUsers();