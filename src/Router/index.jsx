import { createBrowserRouter } from "react-router-dom";
import HomeView from "../views/HomeView";
import MyStoriesView from "../views/MyStoriesView";
import SettingsView from "../views/SettingsView";
import ErrorView from "../views/ErrorView";
import App from "../App";
import MyProjectsView from "../views/MyProjectsView";
import EpicView from "../views/EpicView";
import ProjectView from "../views/ProjectView";
import UserStoryView from "../views/UserStoryView";
import LoginView from "../views/LoginView";
import TaskView from "../views/TaskView";
import ProfileView from "../views/ProfileView";
import ProtectedRoute from "../components/ProtectedRoute";

const PROJECT_ROLES = ["admin_projects", "member"];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "home", element: <HomeView /> },
      { path: "", element: <HomeView /> },
      { path: "settings", element: <SettingsView /> },
      { path: "profile", element: <ProfileView /> },
      {
        path: "my-projects",
        element: (
          <ProtectedRoute allowedRoles={PROJECT_ROLES}>
            <MyProjectsView />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-stories",
        element: (
          <ProtectedRoute allowedRoles={PROJECT_ROLES}>
            <MyStoriesView />
          </ProtectedRoute>
        ),
      },
      {
        path: "project/:idProyecto",
        element: (
          <ProtectedRoute allowedRoles={PROJECT_ROLES}>
            <ProjectView />
          </ProtectedRoute>
        ),
      },
      {
        path: "epic/:idEpica",
        element: (
          <ProtectedRoute allowedRoles={PROJECT_ROLES}>
            <EpicView />
          </ProtectedRoute>
        ),
      },
      {
        path: "userStory/:idHistoriaDeUsuario",
        element: (
          <ProtectedRoute allowedRoles={PROJECT_ROLES}>
            <UserStoryView />
          </ProtectedRoute>
        ),
      },
      {
        path: "task/:Tarea",
        element: (
          <ProtectedRoute allowedRoles={PROJECT_ROLES}>
            <TaskView />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
