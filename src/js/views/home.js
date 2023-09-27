import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

//COMPONENTS:

import PersonCollection from "../component/PersonCollection";
import VehicleCollection from "../component/VehicleCollection";
import PlanetCollection from "../component/PlanetCollection";
import FavsCollection from "../component/FavsCollection";

//AUDIO:

// import ReactAudioPlayer from "react-audio-player";
// import shot from "./shot.mp3";

export const Home = () => {
  //CONTEXT

  const { store } = useContext(Context);

  return (
    <>
      {/* <ReactAudioPlayer src="./blastershot.wav" controls /> */}
      <div className=" container">
        {/*TABS */}

        <nav className="sticky-top bg-black">
          <div
            className="nav nav-tabs mb-md-3 d-flex justify-content-center"
            id="nav-tab"
            role="tablist"
          >
            <button
              className={`tab-button text-space up ${
                store.backToCollection === "characters" ? "active" : ""
              }`}
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Characters
            </button>
            <button
              className={`tab-button text-space up ${
                store.backToCollection === "vehicles" ? "active" : ""
              }`}
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Vehicles
            </button>
            <button
              className={`tab-button text-space up ${
                store.backToCollection === "planets" ? "active" : ""
              }`}
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Planets
            </button>
            <button
              className="tab-button text-space up"
              id="nav-disabled-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-disabled"
              type="button"
              role="tab"
              aria-controls="nav-disabled"
              aria-selected="false"
            >
              Favourites <span>({store.favs.length})</span>
            </button>
          </div>
        </nav>

        {/*CONTENT OF TABS */}

        <div className="tab-content" id="nav-tabContent">
          {/*CONTENT 1 */}

          <div
            className={`tab-pane fade ${
              store.backToCollection === "characters" ? "show active" : ""
            }`}
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabIndex={0}
          >
            <div className="container py-2">
              {/*CONTENT CHARACTERS*/}
              <div className=" text-space row d-flex justify-content-center">
                {store.people.map((person) => (
                  <PersonCollection person={person} />
                ))}
              </div>
            </div>
          </div>

          {/*CONTENT 2 */}

          <div
            className={`tab-pane fade ${
              store.backToCollection === "vehicles" ? "show active" : ""
            }`}
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabIndex="0"
          >
            <div className="container py-2">
              {/*CONTENT VEHICLES*/}
              <div className=" text-space row d-flex justify-content-center">
                {store.vehicles.map((vehicle) => (
                  <VehicleCollection vehicle={vehicle} />
                ))}
              </div>
            </div>
          </div>

          {/*CONTENT 3 */}
          <div
            className={`tab-pane fade ${
              store.backToCollection === "planets" ? "show active" : ""
            }`}
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
            tabIndex="0"
          >
            <div className="container py-2">
              {/*CONTENT PLANETS*/}
              <div className=" text-space row d-flex justify-content-center">
                {store.planets
                  .filter((planet, i) => i !== 0)
                  .map((planet) => (
                    <PlanetCollection planet={planet} />
                  ))}
              </div>
            </div>
          </div>

          {/*CONTENT 4 */}

          <div
            className="tab-pane fade"
            id="nav-disabled"
            role="tabpanel"
            aria-labelledby="nav-disabled-tab"
            tabIndex="0"
          >
            <div className="container py-2">
              {/*CONTENT FAVS*/}
              <div className=" text-space row d-flex justify-content-center mb-5">
                {store.favs.map((fav) => (
                  <FavsCollection fav={fav} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
