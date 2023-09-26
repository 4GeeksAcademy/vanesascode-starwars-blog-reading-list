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

      ///GO BACK FROM A INDIVIDUAL PAGE INTO ITS OWN COLLECTION ///////////////////////////////////////

      handleBackToCollection: (collection) => {
        const store = getStore();
        setStore({ backToCollection: collection });
        console.log(store.backToCollection);
      },

      //ADD TO FAVS ///////////////////////////////////////////////////////////////

      ///FUNCTION to GET the INFO needed

      handleFavsCollection: (collection) => {
        const store = getStore();
        setStore({ collectionOfFav: collection });
        console.log(store.collectionOfFav);
      },

      ///SAVE LOCAL STORAGE data

      updateLocalStorage() {
        localStorage.setItem("favs", JSON.stringify(getStore().favs));
      },

      ///GET LOCAL STORAGE data

      getLocalStorageData() {
        const storedFavString = localStorage.getItem("favs");

        if (storedFavString) {
          const storedFavs = JSON.parse(storedFavString);
          setStore({ favs: storedFavs });
        }
      },

      ///FETCH the FAVS array

      addToFavs: (fav, collection) => {
        const store = getStore();
        const existingFav = store.favs.find(
          (item) =>
            item.favObject.result.uid === fav && item.type === collection
        );
        // console.log(fav);
        // console.log(store.collectionOfFav);

        if (!existingFav) {
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
              // console.log(favObject);
              // console.log(store.collectionOfFav);
              const completefavObject = {
                type: store.collectionOfFav,
                favObject: favObject,
              };

              console.log(completefavObject);
              const newFavs = [...store.favs, completefavObject];
              setStore({ favs: newFavs });
              getActions().updateLocalStorage();
            })

            .catch((error) => console.log("error", error));

          getActions().loadData();
        }
      },

      ///REMOVE FAVS items

      removeFav: (type, name) => {
        const store = getStore();
        console.log(type);
        console.log(name);
        const newFavs = store.favs.filter(
          (item) => item.favObject.result.properties.name !== name
        );
        setStore({ favs: newFavs });
        getActions().updateLocalStorage();
      },
    },
  };
};

export default getState;
