import { Routes, Route } from "react-router-dom";
import Task from "./components/task";
import Category from "./components/category";
import Tag from "./components/tag";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/task" element={<Task />} />
      <Route path="/category" element={<Category />} />
      <Route path="/tag" element={<Tag />} />
    </Routes>
  );
}

export default AppRoutes;
