import Analytics from "./components/Analytics";
import Homepage from "./components/Homepage";
import IRoute from "./route";

const routes: IRoute[] = [
    {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    exact: true,
    },
    {
        path: '/analitycs',
        name: 'Analytics',
        component: Analytics,
        exact: true
    }
]

export default routes