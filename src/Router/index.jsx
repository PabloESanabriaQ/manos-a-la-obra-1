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

export const router = createBrowserRouter(
  [
    {      
      path: "/",
      element: <App />,
      errorElement: <ErrorView />,
      children: [
        {
          path: "login",
          element: <LoginView />,
        },
        {
          path: "home",
          element: <HomeView />,
        },
        {
          path: "",
          element: <HomeView />,
        },
        {
          path: "my-stories",
          element: <MyStoriesView />
        },
        {
          path: "settings",
          element: <SettingsView />
        },
        {
          path: "my-projects",
          element: <MyProjectsView />
        }, 
        { 
          path: "project/:idProyecto", 
          element: <ProjectView />
        },

        {
          path: "epic/:idEpica", 
          element: <EpicView />,
        },
        {
          path: "userStory/:idHistoriaDeUsuario", 
          element: <UserStoryView />,
        },
        {
          path: "task/:Tarea", 
          element: <TaskView />,
        }
      ]
    }
  ]
);