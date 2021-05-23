import LoginPage from "../layouts/LoginPage/LoginPage";
import HomePage from '../layouts/HomePage/HomePage';

import IRoute from "../interfaces/route";

const routes: IRoute[] = [
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        exact: true,
    },
    {
        path: '/', 
        name: 'Home Page', 
        component: HomePage, 
        exact: true, 
    }
]

export default routes;