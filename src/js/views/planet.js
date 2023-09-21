import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Planet = () => {
  const { uid } = useParams();
  const [planetsData, setPlanetsData] = useState(null);

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
    <div>
      {planetsData ? (
        <div>
          <img
              src={`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://starwars-visualguide.com/assets/img/placeholder.jpg";
              }}
            />
          <h2>{planetsData.result.properties.name}</h2>
          <p>Diameter: {planetsData.result.properties.diameter}</p>
          <p>Gravity: {planetsData.result.properties.gravity}</p>
        </div>
      ) : (
        <p>Loading planets data...</p>
      )}
    </div>
  );
};
