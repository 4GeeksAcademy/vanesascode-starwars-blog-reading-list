const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      people: [],
      planets: [],
      vehicles: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      ///

      loadData: () => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("https://www.swapi.tech/api/people", requestOptions)
          .then((response) => response.json())
          .then((result) => setStore({ people: result.results }))
          .catch((error) => console.log("error", error));

        fetch("https://www.swapi.tech/api/vehicles", requestOptions)
          .then((response) => response.json())
          .then((result) => setStore({ vehicles: result.results })) 
          .catch((error) => console.log("error", error));

        fetch("https://www.swapi.tech/api/planets", requestOptions)
          .then((response) => response.json())
          .then((result) => setStore({ planets: result.results }))
          .catch((error) => console.log("error", error));
      },

      ///

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
