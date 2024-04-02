import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthWrapper, ClientRegistrationForm, EditorRegistrationForm, LoginPage, Register, StudentRegistrationForm } from "./core/auth";
import { ErrorPage } from "./shared";
import LandingPage from "./core/landing";

const routes = createBrowserRouter([
    {
        path: '',
        element: <LandingPage />
    },
    {
        path: 'auth',
        element: <AuthWrapper />,
        children: [
            {
                path: '',
                element: <Navigate to="login" replace/>
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <Register />,
                children : [
                    {
                        path: '',
                        element: <Navigate to="student" replace/>
                    },
                    {
                        path: 'student',
                        element: <StudentRegistrationForm />
                    },
                    {
                        path: 'editor',
                        element: <EditorRegistrationForm />
                    },
                    {
                        path: 'client',
                        element: <ClientRegistrationForm />
                    }
                ]
            },
        ]
    },
    {
        path: "/*",
        element: <ErrorPage />
    }
])

export default routes;