import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthWrapper, ClientRegistrationForm, EditorRegistrationForm, EmailVerification, ForgotPassword, LoginPage, Register, StudentRegistrationForm } from "./core/auth";
import { ErrorPage } from "./shared";
import { CoursePage, StudentHomePage, StudentNavbar } from "./core/student";
import { AdminHomePage } from "./core/admin";
import { EditorHomePage } from "./core/editor";
import { ClientHomePage } from "./core/client";
import LandingPage from "./core/landing";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
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
                    },
                ]
            },
            {
                path: 'verify-email',
                element: <EmailVerification />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            }
        ]
    },
    {
        path: 'student',
        element: <StudentNavbar />,
        children: [
            {
                path: '',
                element: <StudentHomePage />
            }, 
            {
                path: 'course/:id',
                element: <CoursePage />
            }
        ]
    },
    {
        path: 'admin',
        element: <AdminHomePage />
    },
    {
        path: "editor",
        element: <EditorHomePage />
    },
    {
        path: "client",
        element: <ClientHomePage />
    },
    {
        path: "/*",
        element: <ErrorPage />
    }
])

export default routes;