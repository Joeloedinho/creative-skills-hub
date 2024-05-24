import AdminDashboard from "./pages/home";
import AdminNavbar from "./components/navbar";
import AllStudentsPage from "./pages/students";
import AllClientsPage from "./pages/clients";
import AllEditorsPage from "./pages/editors";
import AllCoursesPage from "./pages/courses";
import AllProjectsPage from "./pages/projects";
import AllReviewsPage from "./pages/reviews";
import StudentDetailsPage from "./pages/student_details";
import { useAdmin, AdminProvider } from "./contexts/adminContext";
import NewCourse from "./pages/new_course";
import EditorDetailsPage from "./pages/editor_details";
import ClientDetailsPage from "./pages/client_details";
import ProjectDetailsPage from "./pages/project_details";

export {
  AdminDashboard,
  AdminNavbar,
  AllStudentsPage,
  AllClientsPage,
  AllProjectsPage,
  AllCoursesPage,
  AllEditorsPage,
  AllReviewsPage,
  StudentDetailsPage,
  useAdmin,
  AdminProvider,
  NewCourse,
  EditorDetailsPage,
  ClientDetailsPage,
  ProjectDetailsPage,
};
