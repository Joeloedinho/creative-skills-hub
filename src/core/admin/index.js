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
};
