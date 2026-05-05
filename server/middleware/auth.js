import {
    verifyToken
} from '../utils/jwt.js';
import User from '../models/User.js';

export const authMiddleware = async(ctx, next) => {
    const authHeader = ctx.request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.status = 401;
        ctx.body = {
            message: 'unauthorized'
        };
        return;
    }

    const token = authHeader.slice(7);
    if (!token) {
        ctx.status = 401;
        ctx.body = {
            message: 'token is required'
        };
        return;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        ctx.status = 401;
        ctx.body = {
            message: 'token is invalid'
        };
        return;
    }

    const user = await User.findById(decoded.id).lean().select('-password');
    if (!user) {
        ctx.status = 401;
        ctx.body = {
            message: 'user not found'
        };
        return;
    }
    ctx.state.user = user;
    await next();

};
