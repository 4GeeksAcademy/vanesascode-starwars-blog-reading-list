import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Heart from "../../img/heart.png";
import Trash from "../../img/trash.png";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showFavsMessage, setShowFavsMessage] = useState(null);

  const navigate = useNavigate();

  const handleFavsButton = (key, collection) => {
    console.log(key);

    actions.handleFavsCollection(collection);
    actions.addToFavs(key, collection);

    setShowFavsMessage(key);
    setTimeout(() => setShowFavsMessage(null), 2000);
  };

  return (
    <>
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
              Favourites
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
                  <div key={person.uid} className="col-6 col-lg-2  mx-5">
                    <div className="d-flex flex-column justify-content-center align-items-center ">
                      <Link to={`/person/${person.uid}`}>
                        <img
                          src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                          className=" m-1 img-size rounded-circle "
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                          }}
                        />
                      </Link>

                      {/*FAVS BUTTON*/}

                      <div
                        onClick={() => handleFavsButton(person.uid, "people")}
                        // onClick={() => actions.addToFavs(person.uid, "people")}
                        // className=" mb-3 flashy-border text-light text-space border-4 outline-none heart-box mt-3 d-flex justify-content-center align-items-center"
                        className={
                          showFavsMessage === person.uid
                            ? "my-3 bg-black  d-flex justify-content-center align-items-center text-center cursor-pointer"
                            : "my-3 flashy-border text-light text-space border-4 outline-none heart-box  d-flex justify-content-center align-items-center"
                        }
                      >
                        <img
                          src={Heart}
                          className={
                            showFavsMessage === person.uid ? "d-none" : "heart"
                          }
                        />
                        {showFavsMessage === person.uid && (
                          <div className="text-warning text-space">
                            Added to favourites!
                          </div>
                        )}
                      </div>

                      <p className="text-decoration-none  text-light  text-center">
                        {" "}
                        {person.name}
                      </p>
                    </div>
                  </div>
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
                  <div key={vehicle.uid} className="col-6 col-lg-2  mx-5">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <Link to={`/vehicle/${vehicle.uid}`}>
                        <img
                          src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                          className=" m-1 img-size rounded-circle"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                          }}
                        />
                      </Link>

                      {/*FAVS BUTTON*/}

                      <div
                        onClick={() =>
                          handleFavsButton(vehicle.uid, "vehicles")
                        }
                        // onClick={() => actions.addToFavs(vehicle.uid, "vehicles")}
                        // className=" mb-3 flashy-border text-light text-space border-4 outline-none heart-box mt-3 d-flex justify-content-center align-items-center"
                        className={
                          showFavsMessage === vehicle.uid
                            ? "my-3 bg-black  d-flex justify-content-center align-items-center text-center cursor-pointer"
                            : "my-3 flashy-border text-light text-space border-4 outline-none heart-box  d-flex justify-content-center align-items-center"
                        }
                      >
                        <img
                          src={Heart}
                          className={
                            showFavsMessage === vehicle.uid ? "d-none" : "heart"
                          }
                        />
                        {showFavsMessage === vehicle.uid && (
                          <div className="text-warning text-space">
                            Added to favourites!
                          </div>
                        )}
                      </div>
                      <p className="text-decoration-none  text-light mb-5 text-center">
                        {vehicle.name}
                      </p>
                    </div>
                  </div>
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
                    <div key={planet.uid} className="col-6 col-lg-2  mx-5">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <Link to={`/planet/${planet.uid}`}>
                          <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                            className=" m-1 img-size rounded-circle"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src =
                                "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }}
                          />
                        </Link>

                        {/*FAVS BUTTON*/}

                        <div
                          onClick={() =>
                            handleFavsButton(planet.uid, "planets")
                          }
                          // onClick={() => actions.addToFavs(planet.uid, "planets")}

                          // className=" mb-3 flashy-border text-light text-space border-4 outline-none heart-box mt-3 d-flex justify-content-center align-items-center"
                          className={
                            showFavsMessage === planet.uid
                              ? "my-3 bg-black  d-flex justify-content-center align-items-center text-center cursor-pointer"
                              : "my-3 flashy-border text-light text-space border-4 outline-none heart-box  d-flex justify-content-center align-items-center"
                          }
                        >
                          <img
                            src={Heart}
                            className={
                              showFavsMessage === planet.uid
                                ? "d-none"
                                : "heart"
                            }
                          />
                          {showFavsMessage === planet.uid && (
                            <div className="text-warning text-space">
                              Added to favourites!
                            </div>
                          )}
                        </div>
                        <p className="text-decoration-none  text-light mb-5 text-center">
                          {planet.name}
                        </p>
                      </div>
                    </div>
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
                  <div
                    key={fav.favObject.result.uid}
                    className="col-6 col-lg-2  mx-5 "
                  >
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <Link
                        to={`/${
                          fav.type === "people"
                            ? "person"
                            : fav.type === "vehicles"
                            ? "vehicle"
                            : "planet"
                        }/${fav.favObject.result.uid}`}
                        className="text-decoration-none"
                      >
                        <img
                          src={`https://starwars-visualguide.com/assets/img/${
                            fav.type === "people"
                              ? "characters"
                              : fav.type === "vehicles"
                              ? "vehicles"
                              : "planets"
                          }/${fav.favObject.result.uid}.jpg`}
                          className=" m-1 img-size rounded-circle "
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                          }}
                        />
                      </Link>

                      {/*ELIMINATE FAVOURITE*/}

                      <div
                        onClick={() =>
                          actions.removeFav(
                            fav.type,
                            fav.favObject.result.properties.name
                          )
                        }
                        className=" mb-3 flashy-border text-light text-space border-4 outline-none heart-box mt-3 d-flex justify-content-center align-items-center"
                      >
                        <img src={Trash} className="trash" />
                      </div>

                      <p className="text-light text-center">
                        {fav.favObject.result.properties.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
