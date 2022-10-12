import App from './app';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/user.route';
import AuthRouter from './routes/auth.router';
import ExamRoute from './routes/exam.route';
import StatisRoute from "./routes/statis.route";
import ExamBlockRoute from './routes/examBlock.route';

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRouter(),
    new ExamRoute(),
    new ExamBlockRoute(),
    new StatisRoute()
]);

app.listen();

export default app;