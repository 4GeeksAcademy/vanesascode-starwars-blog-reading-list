import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Vehicle = () => {
  const { uid } = useParams();
  const [vehiclesData, setVehiclesData] = useState(null);

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
    <div>
      {vehiclesData ? (
        <div>
          <img
            src={`https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`}
          />
          <h2>{vehiclesData.result.properties.model}</h2>
          <p>Class: {vehiclesData.result.properties.vehicle_class}</p>
          <p>Manufacturer: {vehiclesData.result.properties.manufacturer}</p>
        </div>
      ) : (
        <p>Loading vehicle data...</p>
      )}
    </div>
  );
};
