import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Person = () => {
  const { uid } = useParams();
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://www.swapi.tech/api/people/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPersonData(data);
        console.log(data);
      })

      .catch((error) => console.log("error", error));
  }, [uid]);

  return (
    <div>
      {personData ? (
        <div>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
          />
          <h2>{personData.result.properties.name}</h2>
          <p>Height: {personData.result.properties.height}</p>
          <p>Mass: {personData.result.properties.mass}</p>
        </div>
      ) : (
        <p>Loading person data...</p>
      )}
    </div>
  );
};
