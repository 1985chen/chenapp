import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import dotenv from 'dotenv';
import connectdDb from './config/db.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = new koa();
const PORT = process.env.PORT || 3000;

app.use(async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log('Error:', err);
        ctx.status = err.status || 500;
        ctx.body = {
            message: err.message || 'Internal server error'
        };
    }
});

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}));

app.use(bodyParser());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

connectdDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
