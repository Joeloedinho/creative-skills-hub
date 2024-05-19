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
import {
  CoursePage,
  EnrolledCourses,
  ProfilePage,
  StudentHomePage,
  StudentNavbar,
  StudentProvider,
} from "./core/student";
import {
  AdminDashboard,
  AdminNavbar,
  AllStudentsPage,
  AllClientsPage,
  AllCoursesPage,
  AllEditorsPage,
  AllProjectsPage,
  AllReviewsPage,
  StudentDetailsPage,
} from "./core/admin";
import { EditorHomePage } from "./core/editor";
import { ClientHomePage } from "./core/client";
import LandingPage from "./core/landing";
import CourseDetailPage from "./core/admin/pages/course_details";
import { AdminProvider } from "./core/admin/contexts/adminContext";

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
      {
        path: "my-courses",
        element: <EnrolledCourses />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AuthProvider>
        <AdminProvider>
          <AdminNavbar />
        </AdminProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "students",
        element: <AllStudentsPage />,
      },
      {
        path: "student/:studentID",
        element: <StudentDetailsPage />,
      },
      {
        path: "editors",
        element: <AllEditorsPage />,
      },
      {
        path: "editor/:editorID",
        element: <div>Editor</div>,
      },
      {
        path: "clients",
        element: <AllClientsPage />,
      },
      {
        path: ":clientID",
        element: <div>Client</div>,
      },
      {
        path: "courses",
        element: <AllCoursesPage />,
      },
      {
        path: "course/:courseID",
        element: <CourseDetailPage />,
      },
      {
        path: "Projects",
        element: <AllProjectsPage />,
      },
      {
        path: "project/:projectID",
        element: <div>Projects</div>,
      },
      {
        path: "reviews",
        element: <AllReviewsPage />,
      },
    ],
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
    element: <Navigate to="/" replace />,
  },
]);

export default routes;