import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Homepage from "./pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import JobPage from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import PageJob from "./pages/PageJob";
import AddJobPage from "./pages/AddJobPage";
import EditJob from "./pages/EditJob";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/jobs/:id" element={<PageJob />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
