import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Heart from "../../img/heart.png";

const PlanetCollection = ({ planet }) => {
  //CONTEXT:

  const { actions } = useContext(Context);

  //USESTATE:

  const [showFavsMessage, setShowFavsMessage] = useState(null);

  //FUNCTIONS:

  const handleFavsButton = (key, collection) => {
    console.log(key);

    actions.handleFavsCollection(collection);
    actions.addToFavs(key, collection);

    setShowFavsMessage(key);
    setTimeout(() => setShowFavsMessage(null), 2000);
  };

  return (
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
          onClick={() => handleFavsButton(planet.uid, "planets")}
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
            className={showFavsMessage === planet.uid ? "d-none" : "heart"}
          />
          {showFavsMessage === planet.uid && (
            <div className="text-warning text-space">Added to favourites!</div>
          )}
        </div>
        <p className="text-decoration-none  text-light mb-5 text-center">
          {planet.name}
        </p>
      </div>
    </div>
  );
};

export default PlanetCollection;
