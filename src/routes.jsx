import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import AllRecipes from "./pages/AllRecipes";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./components/layout/MainLayout";
import RecipeDetails from "./pages/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-recipes", element: <AllRecipes /> },
      {
        path: "add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "recipe/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
