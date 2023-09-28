import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Heart from "../../img/heart.png";

const PersonCollection = ({ person }) => {
  //CONTEXT:

  const { actions } = useContext(Context);

  //USESTATE:

  const [showFavsMessage, setShowFavsMessage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  //FUNCTIONS:

  const handleFavsButton = (key, collection) => {
    if (disableButton) {
      return;
    }
    setDisableButton(true);
    console.log(key);

    actions.handleFavsCollection(collection);
    actions.addToFavs(key, collection);

    setShowFavsMessage(key);
    setTimeout(() => setShowFavsMessage(null), 2000);

    setTimeout(() => {
      setDisableButton(false);
    }, 10000);
  };

  return (
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
          disabled={disableButton}
          className={
            showFavsMessage === person.uid
              ? "my-3 bg-black  d-flex justify-content-center align-items-center text-center cursor-pointer"
              : "my-3 flashy-border text-light text-space border-4 outline-none heart-box  d-flex justify-content-center align-items-center"
          }
        >
          <img
            src={Heart}
            className={showFavsMessage === person.uid ? "d-none" : "heart"}
          />
          {showFavsMessage === person.uid && (
            <div className="text-warning text-space">Added to favourites!</div>
          )}
        </div>

        <p className="text-decoration-none  text-light  text-center">
          {" "}
          {person.name}
        </p>
      </div>
    </div>
  );
};

export default PersonCollection;
