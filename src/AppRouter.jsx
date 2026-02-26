import { Routes, Route, Navigate } from "react-router-dom";
import Task from "./components/task";
import Category from "./components/category";
import Tag from "./components/tag";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/task" element={<Task />} />
        <Route path="/category" element={<Category />} />
        <Route path="/tag" element={<Tag />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
