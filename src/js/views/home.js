import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div>
        <h1>Characters</h1>

        {/*PREV AND NEXT BUTTONS */}

        <button onClick={() => actions.goToPreviousPage()}>Previous</button>

        <button onClick={() => actions.goToNextPage()}>Next</button>

        {/*LIST OF PEOPLE */}

        {store.people.map((person) => (
          <div key={person.uid}>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
            />

            <Link to={`/person/${person.uid}`}>{person.name}</Link>
            <button onClick={() => actions.addToFavs(person.uid)}>
              Add to Fav
            </button>
          </div>
        ))}
      </div>

      <div>
        <h1>Vehicles</h1>

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

      <div>
        <h1>Planets</h1>

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
    </>
  );
};
