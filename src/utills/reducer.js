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
        return{
          ...state,
          loading : false,
          data :{
            ...state.data,
            [payload.name] : payload.value
          }
        }
      case "RESET":
        return payload;
      default: {
        throw new Error("Action type does not match!");
      }
    }
  };
  export {reducer};