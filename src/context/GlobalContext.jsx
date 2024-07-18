import { produce } from "immer";
import { createContext, useEffect, useReducer } from "react";

const stateFormLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("my-store")) || {
      user: null,
      isAuthReady: false,
      products: [],
      totalProducts: 0,
      totalPrice: 0,
    }
  );
};

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOG_IN":
      return { ...state, user: payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "IS_AUTH_READY":
      return { ...state, isAuthReady: true };
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    case "TOTAL_PRODUCT_ADD":
      return { ...state, totalProducts: payload };
    case "TOTAL_PRICE":
      return { ...state, totalPrice: payload };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, stateFormLocalStorage());

  const addToCart = (product) => {
    const existingProduct = state.products.find(
      (prod) => prod.id === product.id
    );

    if (existingProduct) {
      const updatedProducts = state.products.map((prod) =>
        prod.id === product.id
          ? { ...prod, amount: prod.amount + product.amount }
          : prod
      );
      dispatch({ type: "ADD_PRODUCT", payload: updatedProducts });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: [...state.products, product] });
    }
  };

  const incrementAmount = (id) => {
    const updatedProducts = produce(state.products, (draft) => {
      const product = draft.find((prod) => prod.id == id);
      if (product) {
        product.amount += 1;
      }
    });

    dispatch({ type: "ADD_PRODUCT", payload: updatedProducts });
  };

  const decrementAmount = (id) => {
    const updatedProducts = produce(state.products, (draft) => {
      const product = draft.find((prod) => prod.id == id);
      if (product && product.amount > 0) {
        product.amount -= 1;
      }
    });

    dispatch({ type: "ADD_PRODUCT", payload: updatedProducts });
  };

  const handleDelete = (id) => {
    const filteredProducts = state.products.filter((prod) => prod.id !== id);
    dispatch({ type: "ADD_PRODUCT", payload: filteredProducts });
  };

  useEffect(() => {
    localStorage.setItem("my-store", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let totalCount = 0;
    let allPrice = 0;

    state.products.forEach((product) => {
      totalCount += product.amount;
      allPrice +=
        product.amount *
        (product.price - (product.price * product.discountPercentage) / 100);
    });

    dispatch({ type: "TOTAL_PRICE", payload: allPrice });
    dispatch({ type: "TOTAL_PRODUCT_ADD", payload: totalCount });
  }, [state.products]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        addToCart,
        incrementAmount,
        decrementAmount,
        handleDelete,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;

// //immer import
// import { produce } from "immer";

// //react import
// import { createContext, useEffect, useReducer } from "react";

// const stateFormLocalStorage = () => {
//   return (
//     JSON.parse(localStorage.getItem("my-store")) || {
//       user: null,
//       isAuthReady: false,
//       products: [],
//       totalProducts: 0,
//       totalPrice: 0,
//     }
//   );
// };

// export const GlobalContext = createContext();

// const changeState = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "LOG_IN":
//       return { ...state, user: payload };
//     case "LOG_OUT":
//       return { ...state, user: null };
//     case "IS_AUTH_READY":
//       return { ...state, isAuthReady: true };
//     case "ADD_PRODUCT":
//       return { ...state, products: payload };
//     case "TOTAL_PRODUCT_ADD":
//       return { ...state, totalProducts: payload };
//     case "TOTAL_PRICE":
//       return { ...state, totalPrice: payload };
//     default:
//       return state;
//   }
// };

// function GlobalContextProvider({ children }) {
//   const [state, dispatch] = useReducer(changeState, stateFormLocalStorage());

//   const addToCart = (product) => {
//     if (!state.products.length) {
//       dispatch({ type: "ADD_PRODUCT", payload: [product] });
//     } else {
//       state.products.map((prod) => {
//         if (prod.id === product.id) {
//           const findeProduct = state.products.find(
//             (prod) => prod.id === product.id
//           );
//           const updateAmount =
//             (findeProduct.amount =
//             findeProduct.amount +=
//               product.amount);

//           const updateAmounts = state.products.map((prod) => {
//             if (prod.id == updateAmount.id) {
//               return { ...prod, amount: updateAmount };
//             } else {
//               return prod;
//             }
//           });

//           // state.products.find((produ) => {
//           //   if (produ.id === prod.id) {
//           //     prod.amount += product.amount;
//           //   }
//           // });

//           dispatch({
//             type: "ADD_PRODUCT",
//             payload: updateAmounts,
//           });
//         } else {
//           dispatch({
//             type: "ADD_PRODUCT",
//             payload: [...state.products, product],
//           });
//         }
//       });
//     }
//   };

//   //increment
//   const incrementAmount = (id) => {
//     function toggleTodo(state, id) {
//       return produce(state, (draft) => {
//         const product = draft.products.find((prod) => prod.id == id);
//         product.amount += 1;
//       });
//     }

//     const { products } = toggleTodo(state, id);
//     dispatch({ type: "ADD_PRODUCT", payload: products });
//   };

//   // delete
//   const handleDelete = (id) => {
//     const filteredProducts = state.products.filter((prod) => prod.id !== id);
//     dispatch({ type: "ADD_PRODUCT", payload: filteredProducts });
//   };

//   useEffect(() => {
//     localStorage.setItem("my-store", JSON.stringify(state));
//   }, [state]);

//   //decrement
//   const decrementAmount = (id) => {
//     function toggleTodo(state, id) {
//       return produce(state, (draft) => {
//         const product = draft.products.find((prod) => prod.id == id);
//         product.amount -= 1;
//       });
//     }

//     const { products } = toggleTodo(state, id);
//     dispatch({ type: "ADD_PRODUCT", payload: products });
//   };

//   useEffect(() => {
//     let totalCount = 0;
//     let allPrice = 0;

//     state.products.forEach((product) => {
//       totalCount = totalCount + product.amount;
//       allPrice +=
//         totalCount * product.price -
//         (product.price * product.discountPercentage) / 100;
//     });

//     dispatch({ type: "TOTAL_PRICE", payload: allPrice });
//     dispatch({ type: "TOTAL_PRODUCT_ADD", payload: totalCount });
//     // console.log(state);
//   }, [state.products]);
//   return (
//     <GlobalContext.Provider
//       value={{
//         ...state,
//         dispatch,
//         addToCart,
//         incrementAmount,
//         decrementAmount,
//         handleDelete,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// }

// export default GlobalContextProvider;
