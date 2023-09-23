const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      planets: [],
      vehicles: [],
      favs: [],
      currentPage: 1,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      ///

      loadData: () => {
        const store = getStore();

        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        //PEOPLE:

        fetch(
          `https://www.swapi.tech/api/people?page=${store.currentPage}&limit=10"`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({
              people: result.results,
            });
          })
          .catch((error) => console.log("error", error));

        //VEHICLES:

        fetch("https://www.swapi.tech/api/vehicles", requestOptions)
          .then((response) => response.json())
          .then((result) => setStore({ vehicles: result.results }))
          .catch((error) => console.log("error", error));

        //PLANETS:

        fetch("https://www.swapi.tech/api/planets", requestOptions)
          .then((response) => response.json())
          .then((result) => setStore({ planets: result.results }))
          .catch((error) => console.log("error", error));
      },

      ///

      addToFavs: (fav) => {
        console.log(fav);

        const store = getStore();

        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`https://www.swapi.tech/api/people/${fav}`, requestOptions)
          .then((response) => response.json())
          .then((favObject) => {
            console.log(favObject);
            const newFavs = [...store.favs, favObject];
            setStore({ favs: newFavs });
          })

          .catch((error) => console.log("error", error));
      },

      ///

      goToNextPage: () => {
        const store = getStore();

        setStore({ currentPage: store.currentPage + 1 });

        console.log(store.currentPage);
      },

      ///

      goToPreviousPage: () => {
        const store = getStore();

        setStore({ currentPage: store.currentPage - 1 });

        console.log(store.currentPage);
      },

      ///
    },
  };
};

export default getState;
