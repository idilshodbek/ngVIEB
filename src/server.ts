import App from './app';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/user.route';
import AuthRouter from './routes/auth.router';
import ExamBlockRoute from './routes/exam-block.route';

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRouter(),
    new ExamBlockRoute(),
]);

app.listen();

export default app;