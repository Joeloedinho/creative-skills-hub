import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AuthWrapper,
  ClientRegistrationForm,
  EditorRegistrationForm,
  EmailVerification,
  ForgotPassword,
  LoginPage,
  Register,
  StudentRegistrationForm,
  AuthProvider,
} from "./core/auth";
import { ErrorPage } from "./shared";
import {
  CoursePage,
  ProfilePage,
  StudentHomePage,
  StudentNavbar,
  StudentProvider,
} from "./core/student";
import { AdminHomePage } from "./core/admin";
import { EditorHomePage } from "./core/editor";
import { ClientHomePage } from "./core/client";
import LandingPage from "./core/landing";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    ),
  },
  {
    path: "auth",
    element: (
      <AuthProvider>
        <AuthWrapper />
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
        children: [
          {
            path: "",
            element: <Navigate to="student" replace />,
          },
          {
            path: "student",
            element: <StudentRegistrationForm />,
          },
          {
            path: "editor",
            element: <EditorRegistrationForm />,
          },
          {
            path: "client",
            element: <ClientRegistrationForm />,
          },
        ],
      },
      {
        path: "verify-email",
        element: <EmailVerification />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "student",
    element: (
      <AuthProvider>
        <StudentProvider>
          <StudentNavbar />
        </StudentProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <StudentHomePage />,
      },
      {
        path: "course/:id",
        element: <CoursePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AuthProvider>
        <AdminHomePage />
      </AuthProvider>
    ),
  },
  {
    path: "editor",
    element: (
      <AuthProvider>
        <EditorHomePage />
      </AuthProvider>
    ),
  },
  {
    path: "client",
    element: (
      <AuthProvider>
        <ClientHomePage />
      </AuthProvider>
    ),
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default routes;
