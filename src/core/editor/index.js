import EditorHomePage from "./pages/home";
import EditorNavbar from "./components/navbar";
import { useEditor, EditorProvider } from "./contexts/editorContext";
import ClientCard from "./components/client_card";
import ClientGroup from "./components/client_group";
import ProfilePage from "./pages/profile_page";
import EditorProjectPage from "./pages/project_page";
import AcceptedProjects from "./pages/accepted_projects_page";
import AllClients from "./pages/clients_page";
import ClientInfo from "./pages/client_info";

const EditorProfilePage = ProfilePage;

export { EditorHomePage, EditorNavbar, useEditor, EditorProvider, ClientCard, ClientGroup, EditorProfilePage, EditorProjectPage, AcceptedProjects, AllClients, ClientInfo }