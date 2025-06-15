import { User } from "../lib/definitions";

export default class UserService {
     
  private baseUrl: string;

  constructor(baseUrl?: string) {
      if(baseUrl === undefined) {
        throw new Error("baseUrl is undefined"); 
      }

      this.baseUrl = `${baseUrl}/api/users`;
      console.log("UserService.baseUrl: ", this.baseUrl);
  }
    async GetAll(): Promise<User[]>  { 
        try {
            const response = await fetch(this.baseUrl, { method: 'GET' })
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.log('Error in fetchData:', error);
            throw error;
        }
    };

    async GetUser(id: string): Promise<User> {
        const url = `${this.baseUrl}?id=${id}`;

        try {
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.log(`Error in fetchData: ${url}\r\n`, error);
            throw error;
        }
    };

    async GetUserByEmail(email: string): Promise<User> {
        const url = `${this.baseUrl}?email=${email}`;

        try {
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.log(`Error in fetchData: ${url}\r\n`, error);
            throw error;
        }
    };

};
 