import  Types  from "../types"
import { Images} from "../../const/data"
import NotificationSet from "../../utils/notification"
import client from "../../api/api";

export const getImage = () => async (dispatch) => {
    await client.get("/sliderimages")
      .then(response => {
        dispatch({
          type: Types.GET_IMAGE,
          payload: { sliderimages: response.data.sliderimages }
        });
      })
      .catch((error)=>{
              dispatch({
                  type: Types.ERROR_IMAGE,
                    payload: {
                       message:error.response.message
                    }
                })
            })
  }; 

  export const addImage = (imageUrl) => async (dispatch) => {
    await client.post("/sliderimages" , { url: imageUrl })
    .then(response => {
      dispatch(getImage())

    })
    .catch((error)=>{
            dispatch({
                type: Types.ERROR_IMAGE,
                  payload: {
                     message:error.response.message
                  }
              })
          })
}; 