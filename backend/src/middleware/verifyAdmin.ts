import type { Request, Response, NextFunction } from 'express';
import admin from '../firebase.js';

export interface AuthedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export async function verifyAdmin(req: AuthedRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);

        if (decoded.admin != true) {
            return res.status(403).json({error: 'Not Authorized' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token'});
    }
}