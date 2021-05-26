import LoginPage from "../layouts/LoginPage/LoginPage";
import MapPage from '../layouts/MapPage/MapPage';
import HomePage from "../layouts/HomePage/HomePage";
import RegisterPage from "../layouts/RegisterPage/RegisterPage";

import IRoute from "../interfaces/RouteInterface";

const routes: IRoute[] = [
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        exact: true,
    },
    {
        path: '/register',
        name: 'Register Page',
        component: RegisterPage,
        exact: true,
    },
    {
        path: '/map', 
        name: 'Map Page', 
        component: MapPage, 
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