import ClientHomePage from "./pages/home";
import EditorCard from "./components/editor_card";
import EditorGroup from "./components/editor_group";
import ClientNavbar from "./components/navbar";
import {ClientProvider, useClient} from "./contexts/clientContext";
import AddProjectPage from "./pages/add_project_page";
import ClientsProjects from "./pages/clients_projects";
import ProfilePage from "./pages/profile_page";
import ProjectPage from "./pages/project_page";
import EditorsInfo from "./pages/editors_info";
import EditorsPage from "./pages/editors_page";
import NewProject from "./pages/new_project";

export {
    ClientHomePage,
    EditorGroup,
    EditorCard,
    ClientsProjects,
    ClientProvider,
    useClient,
    ClientNavbar,
    AddProjectPage,
    ProjectPage,
    ProfilePage,
    EditorsInfo,
    EditorsPage,
};