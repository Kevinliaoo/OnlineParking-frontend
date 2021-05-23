import LoginPage from "../components/LoginPage/LoginPage";
import IRoute from "../interfaces/route";

const routes: IRoute[] = [
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        exact: true,
    }
]

export default routes;