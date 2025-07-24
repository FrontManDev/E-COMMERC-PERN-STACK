import { useSelector } from "react-redux";
import Authentication from "./authentication/Authentication";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
export default function App() {
  const {token,role} = useSelector((state)=>state.auth);
  return (
    <>
    {
      token ? <AdminLayout/> : <Authentication/>
    }
    </>
  );
}
