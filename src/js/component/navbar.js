import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [favsOn, setfavsOn] = useState(false);

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Star Wars Reading List</span>
      </Link>

      <div className="ml-auto">
        <button className="btn btn-primary" onClick={() => setfavsOn(!favsOn)}>
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
      </div>
    </nav>
  );
};
