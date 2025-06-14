import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log('Logging in with:', email, password);
        res.status(200).json({ message: 'Login successful' });
    }
}