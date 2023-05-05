import Types from "../types";

export const imageReducer = (data = [], action) => {
  switch (action.type) {
    case Types.GET_IMAGE:
      return action.payload.sliderimages;
    case Types.SET_PRODUCT:
      localStorage.setItem(
        "sliderimages",
        JSON.stringify(action.payload.sliderimages)
      );
      return action.payload.sliderimages;
    case Types.ERROR_IMAGE:
      return action.payload.message;
    default:
      return data;
  }
};

const initialUser = {
  isLoggedIn: false,
  data: {},
  message: "",
  notify: false,
};
export function userReducer(userData = initialUser, action) {
  switch (action.type) {
    case Types.GET_USER:
      return userData;
    case Types.SET_USER_LOGGED_IN:
      let data = { ...action.payload };
      return {
        data,
        isLoggedIn: data.token !== null ? true : false,
        message: "",
        notify: false,
      };
    case Types.SET_USER:
      return {
        data: action.payload.data,
        isLoggedIn: action.payload.data.token !== null ? true : false,
        message: "Successfully logged in",
        notify: true,
      };
    case Types.SET_USER_ERROR:
      return {
        ...userData,
        message: action.payload.message,
        notify: true,
      };
    case Types.LOG_OUT:
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
      return {
        message: "",
        data: {},
        isLoggedIn: false,
        notify: false,
      };
    default:
      return userData;
  }
}

export function loaderReducer(isLoading = 0, action) {
  switch (action.type) {
    case Types.LOADING_ON:
      return ++isLoading;
    case Types.LOADING_OFF:
      return isLoading === 0 ? 0 : --isLoading;
    default:
      return isLoading;
  }
}

export const categoryReducer = (data = [], action) => {
  switch (action.type) {
    case Types.GET_CATEGORY:
      return action.payload.categories;
    case Types.ERROR_CATEGORY:
      return action.payload.message;
    default:
      return data;
  }
};

export const productReducer = (data = [], action) => {
  switch (action.type) {
    case Types.GET_PRODUCT:
      return action.payload.products;
    case Types.SET_PRODUCT:
      localStorage.setItem("products", JSON.stringify(action.payload.products));
      return action.payload.products;
    case Types.ERROR_PRODUCT:
      return action.payload.message;
    default:
      return data;
  }
};

export const AboutusimageReducer = (state = [], action) => {
  switch (action.type) {
    case Types.GET_ABOUTUSIMAGE:
      return action.payload;
    case Types.SET_ABOUTUSIMAGE:
      localStorage.setItem("aboutusimage", JSON.stringify(action.payload));
      return action.payload;
    case Types.ERROR_ABOUTUSIMAGE:
      return action.payload;
    default:
      return state;
  }
};
