import { createBrowserRouter } from "react-router-dom";
import { AuthWrapper, LoginPage, Register } from "./core/auth";
import { ErrorPage, routePaths } from "./shared";

const routes = createBrowserRouter([
    {
        path: routePaths.login,
        element: <AuthWrapper />,
        
        children: [
            {
                path: '',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <Register />
            },
        ]
    },
    {
        path: "/*",
        element: <ErrorPage />
    }
])

export default routes;