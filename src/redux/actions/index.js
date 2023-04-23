import  Types  from "../../../src/redux/types"
import { Images, ProductCategories } from "../../const/data"
import NotificationSet from "../../utils/notification"
import login from "../../api/login"
import history from "../../const/history"
import domainFinder from "../../api/api"
import client from "../../api/api"


///
// export const ADD_IMAGE = "ADD_IMAGE";

// export const addImage = (url) => ({
//   type: ADD_IMAGE,
//   payload: url,
// });
// export const getImages = () => {
//   return {
//       type: Types.GET_IMAGE,
//       payload: {
//           image:Images
//       }
//   }
// }

// export const getImages = () => async (dispatch) => {
//   await client.get("/slider")
//     .then(response => {
    
//       dispatch({
//         type: Types.GET_IMAGE,
//         payload: { image: response.data },       
//       });
//     })
//     .catch((error)=>{
//             dispatch({
//                 type: Types.ERROR_IMAGE,
//                   payload: {
//                      message:error.response.message
//                   }
//               })
//           })
// }; 
// export const addImage = (url) => async (dispatch) => {
//   await client.post('/slider' , url).then((response)=>{
//       NotificationSet('Successfully created' , 'success')
//       dispatch(getProduct())
//   }).catch((error)=>{
//       dispatch({
//           type: Types.ERROR_IMAGE,
//           payload: {
//              message:error.response.message
//           }
//       })
//   })}


export const getCategory = () => {
    return {
        type: Types.GET_CATEGORY,
        payload: {
            categories:ProductCategories
        }
    }
}

export const getProduct = () => async (dispatch) => {
  await domainFinder.get("/products")
    .then(response => {
    
      dispatch({
        type: Types.GET_PRODUCT,
        payload: { product: response.data },       
      });
    })
    .catch((error)=>{
            dispatch({
                type: Types.ERROR_PRODUCT,
                  payload: {
                     message:error.response.message
                  }
              })
          })
}; 








export const addProduct = (product) => async (dispatch) => {
    await domainFinder.post('/products' , product).then((response)=>{
        NotificationSet('Successfully created' , 'success')
        dispatch(getProduct())
    }).catch((error)=>{
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })}

  

export const deleteProduct = (id) => async (dispatch) =>  {
    await domainFinder.delete(`/products/${id}`).then((response)=>{
        dispatch(getProduct())
        NotificationSet('Successfully deleted' , 'success')
    }).catch((error)=>{
        NotificationSet('problem var' , 'error' , error.response.message)
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })
}


export const editProduct = (product) => async (dispatch) => {
    await domainFinder.put(`/products/${product.id}` , product).then((response)=>{
        dispatch(getProduct())
        NotificationSet(`Successfully edited ${response.data.name}` , 'success')
    }).catch((error)=>{
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })
}


export const getAbout = () => async (dispatch) => {
    await domainFinder.get("/aboutusimage")
      .then(response => {
      
        dispatch({
          type: Types.GET_ABOUTUSIMAGE,
          payload: { Aboutusimage: response.data },       
        });
      })
      .catch((error)=>{
              dispatch({
                  type: Types.ERROR_ABOUTUSIMAGE,
                    payload: {
                       message:error.response.message
                    }
                })
            })
  }; 

  
  
         
export const addAbout = (text) => async (dispatch) => {
    const newAbout = { id: 1, text: text };
    await domainFinder.put(`/aboutusimage/${newAbout.id}`, newAbout)
  .then((response) => {
        console.log(response)
        dispatch(getAbout());
      })
      .catch((error) => {
        dispatch({
          type: Types.ERROR_ABOUTUSIMAGE,
          payload: {
            message: error.response.message
          }
        })
      });
  };

  export const getUserData = (exp) => async (dispatch) => {
    dispatch({ type: Types.LOADING_ON });
    let token = localStorage.getItem("access_token")
    let session_token = sessionStorage.getItem("access_token")

    if (token !== null || session_token !== null){
       login
          .get(`users/2`)
          .then((res) => {
            dispatch({
              type: Types.SET_USER_LOGGED_IN,
              payload: {...res.data.data},
            });
          })
          .catch((err) => {
            dispatch({
              type: Types.LOG_OUT,
            });
            history.push('/')
          })
          .finally(() => {
            dispatch({ type: Types.LOADING_OFF });
          });
    }
    else{
      dispatch({
        type: Types.LOG_OUT,
      });
      history.push('/')
      dispatch({ type: Types.LOADING_OFF });
    }
  };

  
  export const logInUser = (e, p , remember) => async (dispatch) => {
    if (e.trim().length === 0 ||   p.trim().length === 0) {
      dispatch({
        type: Types.SET_USER_ERROR,
        payload: { message: "İstifadəçi adı və şifrə daxil edilməlidir" },
      });
    } else {
      dispatch({ type: Types.LOADING_ON });
      await login
        .post(`login` , {
          username:e , password:p
        })
        .then((res) => {
          {remember ? localStorage.setItem("access_token", res.data.token) :  sessionStorage.setItem("access_token", res.data.token);}
          dispatch(getUserData());
        })
        .catch((error) => {
          dispatch({
            type: Types.SET_USER_ERROR,
            payload: { message: "İstifadəçi adı və ya şifrə yanlışdır" },
          });
        })
        .finally(() => {
          dispatch({ type: Types.LOADING_OFF });
        });
    }
  };

  export const toggleLoading = (payload) => ({
    type: payload ? Types.LOADING_ON : Types.LOADING_OFF,
});

export const logOut = () => (dispatch) =>  {
    history.push('/')
    dispatch(
        {
            type: Types.LOG_OUT,
        }
    )
};