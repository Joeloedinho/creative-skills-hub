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
  ProfilePage as StudentProfilePage,
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
  NewCourse,
  EditorDetailsPage,
  ClientDetailsPage,
  ProjectDetailsPage,
    AdminProvider,
    CourseDetailPage
} from "./core/admin";
import {
  AcceptedProjects,
  AllClients,
  ClientInfo,
  EditorHomePage,
  EditorNavbar,
  EditorProfilePage,
  EditorProjectPage,
  EditorProvider,
} from "./core/editor";
import {
  AddProjectPage,
  ProjectPage,
  ClientHomePage,
  ClientNavbar,
  ClientsProjects,
  ProfilePage as ClientProfilePage,
  EditorsPage, EditorsInfo, ClientProvider
} from "./core/client";
import LandingPage from "./core/landing";
import { ErrorPage } from "./shared";

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
        element: <StudentProfilePage />,
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
        element: <EditorDetailsPage />,
      },
      {
        path: "clients",
        element: <AllClientsPage />,
      },
      {
        path: "client/:clientID",
        element: <ClientDetailsPage />,
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
        element: <ProjectDetailsPage />,
      },
      {
        path: "reviews",
        element: <AllReviewsPage />,
      },
      {
        path: "new-course",
        element: <NewCourse />,
      },
    ],
  },
  {
    path: "editor",
    element: (
      <AuthProvider>
        <EditorProvider>
          <EditorNavbar />
        </EditorProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <EditorHomePage />,
      },
      {
        path: "projects/:projectId",
        element: <EditorProjectPage />,
      },
      {
        path: "clients",
        element: <AllClients />,
      },
      {
        path: "client/:clientId",
        element: <ClientInfo />,
      },
      {
        path: "my-projects",
        element: <AcceptedProjects />,
      },
      {
        path: "profile",
        element: <EditorProfilePage />,
      },
    ],
  },
  {
    path: "client",
    element: (
      <AuthProvider>
        <ClientProvider>
          <ClientNavbar />
        </ClientProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <ClientHomePage />
      },
      {
        path: "clients-projects",
        element: <ClientsProjects />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectPage />
      },
      {
        path: "add-project",
        element: <AddProjectPage />
      },
      {
        path: "editors",
        element: <EditorsPage />
      },
      {
        path: "editor/:editorID",
        element: <EditorsInfo />
      },
      {
        path: "profile",
        element: <ClientProfilePage />
      }
    ]
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default routes;
