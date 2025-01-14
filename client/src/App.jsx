import { Outlet } from "react-router-dom";
import NavbarComponents from "./components/navbar/NavbarComponents";
import FooterComponents from "./components/footer/FooterComponents";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavbarComponents />
      <Outlet />
      <FooterComponents />
    </>
  );
}

export default App;
