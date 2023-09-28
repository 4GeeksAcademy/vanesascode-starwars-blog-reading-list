import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Vehicle = () => {
  // ROUTE PARAMS & NAVIGATE:

  const { uid } = useParams();

  const navigate = useNavigate();

  //USETATES:

  const [vehiclesData, setVehiclesData] = useState(null);
  const [showFavsMessage, setShowFavsMessage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  //CONTEXT:

  const { actions } = useContext(Context);

  //FUNCTIONS:

  const handleBackVehicles = () => {
    actions.handleBackToCollection("vehicles");
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

    fetch(`https://www.swapi.tech/api/vehicles/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setVehiclesData(data);
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  }, [uid]);

  return (
    <div className="container py-lg-5 py-0 text-light text-space">
      {vehiclesData ? (
        <div>
          <div className="d-flex flex-column flex-lg-row">
            <h2 className="text-warning pb-1 d-block d-lg-none text-center">
              {vehiclesData.result.properties.name}
            </h2>
            <div className="d-flex justify-content-center mb-4 mb-md-0">
              <img
                src={`https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`}
                className="img-vehicle"
              />
            </div>
            <div className="ms-0 ms-xl-0 ms-lg-5 data-box-vehicles d-flex align-items-center flex-column mb-4 mb-md-0">
              <div className="text-lg-start text-center  ps-md-5 ps-0">
                <h2 className="text-warning pb-1 d-none d-lg-block">
                  {vehiclesData.result.properties.name}
                </h2>
                <p>Model: {vehiclesData.result.properties.model}</p>
                <p>Class: {vehiclesData.result.properties.vehicle_class}</p>
                <p>
                  Manufacturer: {vehiclesData.result.properties.manufacturer}
                </p>
                <p>Cost: {vehiclesData.result.properties.cost_in_credits}</p>
                <p>Crew: {vehiclesData.result.properties.crew}</p>
                <p>Passengers: {vehiclesData.result.properties.passengers}</p>
                <p>Capacity: {vehiclesData.result.properties.cargo_capacity}</p>
                <p>
                  Speed: {vehiclesData.result.properties.max_atmosphering_speed}
                </p>
                <p>Consumables: {vehiclesData.result.properties.consumables}</p>

                {/*FAVS BUTTON*/}

                <div className="d-flex justify-content-lg-start justify-content-center">
                  <div
                    disabled={disableButton}
                    onClick={() =>
                      handleFavsButton(vehiclesData.result.uid, "vehicles")
                    }
                    className={
                      showFavsMessage === vehiclesData.result.uid
                        ? "my-3 bg-black  d-flex justify-content-center align-items-center  cursor-pointer"
                        : "my-3 flashy-border text-light text-space border-4 outline-none heart-box  d-flex justify-content-center align-items-center"
                    }
                  >
                    <i
                      className={
                        showFavsMessage === vehiclesData.result.uid
                          ? "d-none"
                          : "fa-solid fa-heart fa-lg text-center ms-1"
                      }
                      style={{ color: "#fafafa" }}
                    ></i>
                    {showFavsMessage === vehiclesData.result.uid && (
                      <div className="text-warning text-space">
                        Added to favourites!
                      </div>
                    )}
                  </div>
                </div>

                {/*GO BACK BUTTON*/}

                <div
                  className="d-flex align-items-center mt-4 mouse justify-content-lg-start justify-content-center"
                  onClick={handleBackVehicles}
                >
                  <i
                    class="fa-solid fa-arrow-left-long fa-sm mb-3"
                    style={{ color: "#ffffff" }}
                  ></i>

                  <p className="ms-2 back-text">Back to vehicles</p>
                </div>
              </div>
            </div>
            <div className="ms-md-5  d-none d-xl-block">
              The vehicles of the Star Wars universe are just as captivating as
              the characters themselves. From the iconic Millennium Falcon, a
              symbol of adventure and daring, to the sleek and agile X-wing
              starfighters, the vehicles transport us to a galaxy far, far away.
              Whether it's the imposing AT-AT walkers marching across the snowy
              landscapes of Hoth or the nimble speeder bikes zooming through the
              forests of Endor, each vehicle has its own unique design and
              purpose. The starships like the Star Destroyers and TIE fighters
              dominate the vastness of space, while the landspeeders and swoop
              bikes navigate the bustling streets of Tatooine. These vehicles
              not only serve as a means of transportation, but they also embody
              the spirit of the Star Wars universe and add depth to the epic
              saga. They remind us that adventure awaits at every turn, and that
              the power of imagination knows no bounds. May the Force guide
              these incredible vehicles on their never-ending journeys.
            </div>
          </div>

          <div className="mt-4 d-block d-xl-none px-2">
            The vehicles of the Star Wars universe are just as captivating as
            the characters themselves. From the iconic Millennium Falcon, a
            symbol of adventure and daring, to the sleek and agile X-wing
            starfighters, the vehicles transport us to a galaxy far, far away.
            Whether it's the imposing AT-AT walkers marching across the snowy
            landscapes of Hoth or the nimble speeder bikes zooming through the
            forests of Endor, each vehicle has its own unique design and
            purpose. The starships like the Star Destroyers and TIE fighters
            dominate the vastness of space, while the landspeeders and swoop
            bikes navigate the bustling streets of Tatooine. These vehicles not
            only serve as a means of transportation, but they also embody the
            spirit of the Star Wars universe and add depth to the epic saga.
            They remind us that adventure awaits at every turn, and that the
            power of imagination knows no bounds. May the Force guide these
            incredible vehicles on their never-ending journeys.
          </div>
        </div>
      ) : (
        <p className="ms-3">Loading vehicle data...</p>
      )}
    </div>
  );
};
