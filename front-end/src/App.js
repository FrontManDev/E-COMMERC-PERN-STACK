import Authentication from "./authentication/Authentication";
import AdminLayout from "./layouts/AdminLayout";
import StoreLayout from "./layouts/StoreLayout";
import { Route, Routes } from "react-router-dom";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";
import NotFound from "./notfound/NotFound";
export default function App() {
  return (
    <Routes>
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/Store" element={<StoreLayout />} />
      <Route path="/admin/*" element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      } />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
