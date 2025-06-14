import type { NextApiRequest, NextApiResponse } from 'next';
import users from '@/app/data/users.json';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'GET') {
        const id = (req.query.id as string) || '';
        if (id) {
        res.status(200).json(users.filter(user => user.id === id));
        } else {
        res.status(200).json(users);
        }
    }
}