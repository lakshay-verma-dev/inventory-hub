import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import NavbarComponents from "./components/navbar/NavbarComponents";
import FooterComponents from "./components/footer/FooterComponents";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavbarComponents />
      {/* <div className="min-h-screen"> */}
      <Outlet />
      {/* </div> */}
      <FooterComponents />
    </>
  );
}

export default App;
