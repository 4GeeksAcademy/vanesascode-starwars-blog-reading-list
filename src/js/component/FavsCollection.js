import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Trash from "../../img/trash.png";

const FavsCollection = ({ fav }) => {
  //CONTEXT

  const { actions } = useContext(Context);

  return (
    <div key={fav.favObject.result.uid} className="col-6 col-lg-2  mx-5 ">
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
            actions.removeFav(fav.type, fav.favObject.result.properties.name)
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
  );
};

export default FavsCollection;
