const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      planets: [],
      vehicles: [],
      favs: [],
      currentPage: 1,
      backToCollection: "characters",
      collectionOfFav: "people",
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      ///FETCH COLLECTIONS/////////////////////////////////////////////////////////

      loadData: () => {
        const store = getStore();

        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        //PEOPLE:

        fetch(
          `https://www.swapi.tech/api/people?page=1&limit=100"`,
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

        fetch(
          "https://www.swapi.tech/api/vehicles?page=1&limit=20",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ vehicles: result.results }))
          .catch((error) => console.log("error", error));

        //PLANETS:

        fetch(
          "https://www.swapi.tech/api/planets?page=1&limit=18",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ planets: result.results }))
          .catch((error) => console.log("error", error));
      },

      //ADD TO FAVS ///////////////////////////////////////////////////////////////

      ///FUNCTION

      handleFavsCollection: (collection) => {
        const store = getStore();
        setStore({ collectionOfFav: collection });
        console.log(store.collectionOfFav);
      },

      ///FETCH

      addToFavs: (fav) => {
        const store = getStore();
        console.log(fav);
        console.log(store.collectionOfFav);

        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          `https://www.swapi.tech/api/${store.collectionOfFav}/${fav}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((favObject) => {
            console.log(favObject);
            console.log(store.collectionOfFav);
            const completefavObject = {
              type: store.collectionOfFav,
              favObject: favObject,
            };

            console.log(completefavObject);
            const newFavs = [...store.favs, completefavObject];
            setStore({ favs: newFavs });
          })

          .catch((error) => console.log("error", error));

        getActions().loadData();
      },

      ///GO BACK FROM A INDIVIDUAL PAGE INTO ITS OWN COLLECTION ///////////////////////////////////////

      handleBackToCollection: (collection) => {
        const store = getStore();
        setStore({ backToCollection: collection });
        console.log(store.backToCollection);
      },

      /////////////////////////////////////////////////////////////////////////////////////////////////

      removeFav: (type, uid) => {
        const store = getStore();
        const newFavs = store.favs.filter(
          (item) => item.favObject.result.uid !== uid && item.type !== type
        );
        setStore({ favs: newFavs });
      },

      // goToPreviousPage: () => {
      //   const store = getStore();

      //   setStore({ currentPage: store.currentPage - 1 });

      //   console.log(store.currentPage);
      // },

      ///
    },
  };
};

export default getState;
