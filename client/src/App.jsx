import { Outlet } from "react-router-dom";
import NavbarComponents from "./components/navbar/NavbarComponents";
import FooterComponents from "./components/footer/FooterComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        // console.log("asf",userData);
        
        if (userData.token && userData.user) {
          dispatch(setUser(userData));
        } else {
          console.error(
            "Invalid user data structure in localStorage:",
            userData
          );
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, [dispatch]);
  return (
    <>
      <NavbarComponents />
      <Outlet />
      <FooterComponents />
    </>
  );
}

export default App;
