import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Heart from "../../img/heart.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [favsOn, setfavsOn] = useState(false);

  const triggerTabList = document.querySelectorAll("#myTab button");
  triggerTabList.forEach((triggerEl) => {
    const tabTrigger = new bootstrap.Tab(triggerEl);

    triggerEl.addEventListener("click", (event) => {
      event.preventDefault();
      tabTrigger.show();
    });
  });

  return (
    <>
      <div className="bg-black container">
        {/*TABS */}

        <ul
          className="nav nav-pills mb-3 d-flex justify-content-center "
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              className="tab-button text-space up"
              id="pills-characters-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-characters"
              type="button"
              role="tab"
              aria-controls="pills-characters"
              aria-selected="true"
            >
              Characters
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              className="tab-button text-space up"
              id="pills-vehicles-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-vehicles"
              type="button"
              role="tab"
              aria-controls="pills-vehicles"
              aria-selected="false"
            >
              Vehicles
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              className="tab-button text-space up"
              id="pills-planets-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-planets"
              type="button"
              role="tab"
              aria-controls="pills-planets"
              aria-selected="false"
            >
              Planets
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              className="tab-button text-space up"
              id="pills-favourites-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-favourites"
              type="button"
              role="tab"
              aria-controls="pills-favourites"
              aria-selected="false"
              onClick={() => setfavsOn(!favsOn)}
            >
              Favourites
            </button>

            {favsOn ? (
              store.favs.length > 0 ? (
                store.favs.map((fav) => (
                  <div key={fav.uid}>
                    <p>{fav.name}</p>
                  </div>
                ))
              ) : (
                <p>No favs added yet</p>
              )
            ) : (
              ""
            )}
          </li>
        </ul>

        {/*CONTENT CHARACTERS*/}

        <div
          className="tab-content"
          id="pills-tabContent d-flex justify-content-center align-items-center"
        >
          <div
            className="tab-pane fade show active d-flex justify-content-center align-items-center"
            id="pills-characters"
            role="tabpanel"
            aria-labelledby="pills-characters-tab"
            tabindex="0"
          >
            {/*LIST OF PEOPLE */}
            <div className="d-flex flex-wrap">
              {store.people.map((person) => (
                <div
                  key={person.uid}
                  className="bg-black text-space d-flex flex-column justify-content-center align-items-center border-card"
                >
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                    className=" m-2 img-size "
                  />

                  <Link
                    to={`/person/${person.uid}`}
                    className="text-decoration-none text-size text-light"
                  >
                    {person.name}
                  </Link>
                  <button
                    onClick={() => actions.addToFavs(person.uid)}
                    className=" mb-5 flashy-border  text-light text-space border-4 outline-none heart-box mt-3 d-flex justify-content-center align-items-center"
                  >
                    <img src={Heart} className="heart" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/*CONTENT VEHICLES*/}
        </div>
        <div
          className="tab-pane fade"
          id="pills-vehicles"
          role="tabpanel"
          aria-labelledby="pills-vehicles-tab"
          tabindex="0"
        >
          <div>
            {store.vehicles.map((vehicle) => (
              <div key={vehicle.uid}>
                <img
                  src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                />
                <Link to={`/vehicle/${vehicle.uid}`}>{vehicle.name}</Link>
                <button>Add to Fav</button>
              </div>
            ))}
          </div>
        </div>

        {/*CONTENT PLANETS*/}
        <div
          className="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
          tabindex="0"
        >
          <div>
            {store.planets.map((planet) => (
              <div key={planet.uid}>
                <img
                  src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                  }}
                />
                <Link to={`/planet/${planet.uid}`}>{planet.name}</Link>
                <button>Add to Fav</button>
              </div>
            ))}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-disabled"
          role="tabpanel"
          aria-labelledby="pills-disabled-tab"
          tabindex="0"
        >
          ...
        </div>
      </div>
    </>
  );
};
