
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { categoryReducer, productReducer, AboutusimageReducer, loaderReducer, userReducer, imageReducer } from "../redux/reducers";
 
const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  aboutusimage: AboutusimageReducer,
  isLoading: loaderReducer,
  user:userReducer,
  sliderimage: imageReducer,

});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
