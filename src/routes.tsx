import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import LoggedOutRoute from "./pages/LoggedOutRoute";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import { ChatPage } from "./pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <LoggedOutRoute>
            <RegisterPage />
          </LoggedOutRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <LoggedOutRoute>
            <LoginPage />
          </LoggedOutRoute>
        ),
      },
      
    ],
  },
]);

export default router;
