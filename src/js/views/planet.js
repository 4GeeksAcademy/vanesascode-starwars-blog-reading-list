import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Planet = () => {
  // ROUTE PARAMS & NAVIGATE:

  const { uid } = useParams();

  const navigate = useNavigate();

  //USETATES:

  const [planetsData, setPlanetsData] = useState(null);
  const [showFavsMessage, setShowFavsMessage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  //CONTEXT:

  const { actions } = useContext(Context);

  //FUNCTIONS:

  const handleBackPlanets = () => {
    actions.handleBackToCollection("planets");
    navigate("/");
  };

  const handleFavsButton = (key, collection) => {
    if (disableButton) {
      return;
    }
    setDisableButton(true);
    actions.addToFavs(key, collection);
    setShowFavsMessage(key);
    setTimeout(() => setShowFavsMessage(null), 2000);

    setTimeout(() => {
      setDisableButton(false);
    }, 10000);
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://www.swapi.tech/api/planets/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPlanetsData(data);
        console.log(data);
      })

      .catch((error) => console.log("error", error));
  }, [uid]);

  return (
    <div className="container py-lg-5 py-0 text-light text-space">
      {planetsData ? (
        <div>
          <div className="d-flex flex-column flex-lg-row ">
            <h2 className="text-warning pb-1 d-block d-lg-none text-center">
              {planetsData.result.properties.name}
            </h2>
            <div className="mx-md-5 d-flex justify-content-center mb-4 mb-md-0">
              <img
                src={`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
                className="img-planet"
              />
            </div>
            <div className=" ms-lg-5 data-box d-flex align-items-center flex-column mb-4 mb-md-0">
              <div className="text-lg-start text-center ps-md-5 ps-0">
                <h2 className="text-warning pb-1 d-none d-lg-block">
                  {planetsData.result.properties.name}
                </h2>
                <p>Population: {planetsData.result.properties.population}</p>
                <p>Climate: {planetsData.result.properties.climate}</p>
                <p>Terrain: {planetsData.result.properties.terrain}</p>
                <p>
                  Surface of Water:{" "}
                  {planetsData.result.properties.surface_water}
                </p>
                <p>Diameter: {planetsData.result.properties.diameter}</p>
                <p>Gravity: {planetsData.result.properties.gravity}</p>
                <p>
                  Rotation Period:{" "}
                  {planetsData.result.properties.rotation_period}
                </p>
                <p>
                  Orbital Period: {planetsData.result.properties.orbital_period}
                </p>

                {/*FAVS BUTTON*/}

                <div className="d-flex justify-content-lg-start justify-content-center">
                  <div
                    disabled={disableButton}
                    onClick={() =>
                      handleFavsButton(planetsData.result.uid, "planets")
                    }
                    className={
                      showFavsMessage === planetsData.result.uid
                        ? "my-3 bg-black  d-flex justify-content-center align-items-center  cursor-pointer"
                        : "my-3 flashy-border text-light text-space border-4 outline-none heart-box  d-flex justify-content-center align-items-center"
                    }
                  >
                    <i
                      className={
                        showFavsMessage === planetsData.result.uid
                          ? "d-none"
                          : "fa-solid fa-heart fa-lg text-center ms-1"
                      }
                      style={{ color: "#fafafa" }}
                    ></i>
                    {showFavsMessage === planetsData.result.uid && (
                      <div className="text-warning text-space">
                        Added to favourites!
                      </div>
                    )}
                  </div>
                </div>

                {/*GO BACK BUTTON*/}

                <div
                  className="d-flex align-items-center mt-4 justify-content-lg-start justify-content-center mouse"
                  onClick={handleBackPlanets}
                >
                  <i
                    class="fa-solid fa-arrow-left-long fa-sm mb-3"
                    style={{ color: "#ffffff" }}
                  ></i>
                  <p className="ms-2 back-text">Back to planets</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4  px-2">
            The Star Wars universe is not only home to captivating characters,
            but also to a vast array of mesmerizing planets. Each planet has its
            own unique landscapes, cultures, and stories waiting to be
            discovered. From the desert planet of Tatooine, where the twin suns
            scorch the sandy dunes, to the lush forests of Endor, where the
            Ewoks dwell among the towering trees, these planets transport us to
            extraordinary worlds beyond our imagination. The icy planet of Hoth,
            with its freezing temperatures and towering ice caves, serves as a
            battleground for the Rebel Alliance and the Empire. Coruscant, a
            bustling city-planet, is a hub of political intrigue and vibrant
            nightlife. The swampy marshes of Dagobah conceal the wisdom of Jedi
            Master Yoda, while the vibrant underwater city of Naboo showcases
            the elegance and beauty of the galaxy. These planets, each with
            their own distinct characteristics, contribute to the rich tapestry
            of the Star Wars saga. They remind us that the universe is vast and
            full of wonders, and that adventure awaits us on every planet we
            explore. May the Force guide us as we embark on these incredible
            journeys through the stars.
          </div>
        </div>
      ) : (
        <p className="ms-3">Loading planets data...</p>
      )}
    </div>
  );
};
