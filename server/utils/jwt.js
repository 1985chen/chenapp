import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chenapp_secret_key';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generatteToken = (payload) => {
    console.log({payload, JWT_SECRET, JWT_EXPIRES_IN});
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token) => {
    console.log({token, JWT_SECRET, jwt});
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (_error) {
        return null;
    }
};
