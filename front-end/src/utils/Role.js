import { jwtDecode } from "jwt-decode";
export default function Role() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded.Role);
    return decoded.Role;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}
