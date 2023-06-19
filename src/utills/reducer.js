const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_COMPLETED":
      return {
        ...state,
        loading: false,
      }
    case "FATCHED":
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "FORM_VALUE":
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [payload.name]: payload.value
        }
      }

    // admin
    case "SALESDATA":
      return {
        ...state,
        salesData: payload
      }
    case "BLOGDATA":
      return {
        ...state,
        blogData: payload
      }
    case "PRODUCTDATA":
      return {
        ...state,
        productsData: payload
      }
    case "PRODUCT_VALUE":
      return {
        ...state,
        loading: false,
        productsData: {
          ...state.data,
          [payload.name]: payload.value
        }
      }


    case "USERDATA":
      return {
        ...state,
        userData: payload
      }
    case "CONTACT":
      return {
        ...state,
        contact: payload
      }
    case "ADMINDATA":
      return {
        ...state,
        adminData: payload
      }


    case "RESET":
      return payload;
    default: {
      throw new Error("Action type does not match!");
    }
  }
};
export { reducer };