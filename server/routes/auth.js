import Router from 'koa-router';
import User from '../models/User.js';
import {
    authMiddleware
} from '../middleware/auth.js';
import {
    generateToken
} from '../utils/jwt.js';

const router = new Router({prefix: '/api/auth'});


router.post('/register', async ctx => {
    console.log({User});
    const {
        username,
        password,
        email,
    } = ctx.request.body;
    if (!username || !email || !password) {
        ctx.status = 400;
        ctx.body = {error: 'Missing required fields'};
        return;
    }

    const existingUser = await User.findOne({
        $or: [
            {email},
            {username},
        ]
    });

    if (existingUser) {
        ctx.status = 409;

        ctx.body = {
            message: 'User already exists'
        };
        return;
    }

    // TODO: 创建用户
    const user = new User({
        username,
        password,
        email,
    });

    await user.save();
    console.log({user});

    const token = generateToken({
        id: user._id,
        username: user.username,
    });

    ctx.status = 201;
    ctx.body = {
        massage: 'User registered succwssfully',
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    };
});

router.post('/login', async ctx => {
    const {
        email,
        password,
    } = ctx.request.body;
    console.log(ctx.request.body, 'ctx.request.body');
    if (!email || !password) {
        ctx.status = 400;
        ctx.body = {
            message: 'Email and password are required'
        };
        return;
    }
    const user = await User.findOne({email});
    if (!user) {
        ctx.status = 401;
        ctx.body = {
            message: 'Invalid email or password'
        };
        return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        ctx.status = 401;
        ctx.body = {
            message: 'Invalid email or password'
        };
        return;
    }
    const token = generateToken({
        id: user._id,
        username: user.username,
    });

    ctx.body = {
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    };
});

router.get('/me', authMiddleware, async(ctx) => {
    const user = ctx.state.user;
    console.log(user, 'user');
    if (!user) {
        ctx.status = 401;
        ctx.body = {
            message: 'Unauuthorized'
        };
        return;
    }
    ctx.body = {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    };
});

export default router;
