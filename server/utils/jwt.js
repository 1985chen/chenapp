import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chenapp_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (payload) => {
    console.log({
        payload,
        JWT_SECRET,
        JWT_EXPIRES_IN,
        token: jwt.sign(payload, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: JWT_EXPIRES_IN,
        }),
    });
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token) => {
    try {
        console.log({
            token,
            JWT_SECRET,
        });
        return jwt.verify(token, JWT_SECRET, {algorithm: 'HS256'});
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
};
