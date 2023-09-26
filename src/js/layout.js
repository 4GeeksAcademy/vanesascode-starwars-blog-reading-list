import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Vehicle } from "./views/vehicle";
import { Planet } from "./views/planet";
import { Person } from "./views/person";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Particles from "./component/particles";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/person/:uid" element={<Person />} />

            <Route path="/planet/:uid" element={<Planet />} />

            <Route path="/vehicle/:uid" element={<Vehicle />} />

            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
      <Particles id="tsparticles" />
    </div>
  );
};

export default injectContext(Layout);
