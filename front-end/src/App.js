import Authentication from "./authentication/Authentication";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Role from "./utils/Role";
export default function App() {
  const role = Role();
  return (
    <>
    {
      localStorage.getItem("token") ? (role === "ADMIN" ? <AdminLayout/> : <UserLayout/>) : (<Authentication/>)
    }
    </>
  );
}
