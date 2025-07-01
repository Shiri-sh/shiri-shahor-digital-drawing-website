import Navbar from "./layout/navbar";
import About from "./layout/about";
import Login from "./layout/login";
import SignUp from "./layout/signUp";
import GalleryGrid from "./gallery/galleryGrid";
import Contact from "./orders/contact";
import Orders from "./orders/orders";
import OpenSection from "./layout/openSection";
import { Outlet } from "react-router-dom";
import "./css/App.css";
function App() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
