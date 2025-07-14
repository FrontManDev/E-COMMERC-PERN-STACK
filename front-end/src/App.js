import Authentication from "./authentication/Authentication";
import SideBar from "./components/SideBar/SideBar";
import Users from "./pages/admin/Users/Users";
export default function App() {
  return (
    <div>
      <SideBar/>
      <Users/>
    </div>
  );
}
