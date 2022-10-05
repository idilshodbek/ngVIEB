import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/user.route';
import AuthRouter from './routes/auth.router';
// import validateEnv from './utils/validateEnv';

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRouter(),
]);

app.listen();

export default app;