import { createContext } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/NavigationBar";
import Footer from "./Footer";


export const userContext = createContext(
  "data not available"
);
export const dataContext = createContext();

const Home = () => {
  return (
    <section className="section-home">
      <Sidebar />
      <NavigationBar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Home;
