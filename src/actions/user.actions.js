import {
  USER_CURRENT_PENDING,
  USER_CURRENT_FULFILLED,
  USERS_ADD_LIST,
  USER_UPDATE,
  USER_DELETE,
  USER_DELETE_MULTIPLE,
  USER_DELETE_ALL
} from "./types";
import store from "../store";
import axios from "axios";

export const FAKE_ENDPOINT_GET_USERS =
  "https://jsonplaceholder.typicode.com/users/";

// import config from '../config';
// import store from '../store';
/**
 *
 * @param {String} username (same as email address)
 * @param {String} password
 */
// export function login({ username, password }) {
//     return function (dispatch) {
//         dispatch({ type: 'USER_LOGIN', payload: authenticateUser() });
//     }
// }

// export function logout() {
//     return function (dispatch) {
//         //// Promise middleware will fire {type}_PENDING and then {type}_REJECTED with error as the payload or {type}_FULFILLED and response as the payload for this dispatch automatically
//         dispatch({ type: "USER_LOGOUT", payload: logout() });
//         dispatch(loginPage());
//     };
// }

export function getCurrentUser() {
  store.dispatch({ type: USER_CURRENT_PENDING });
  store.dispatch({
    type: USER_CURRENT_FULFILLED,
    payload: [
      {
        Name: "username",
        Value: "test@user.com"
      },
      {
        Name: "name",
        Value: "Test"
      },
      {
        Name: "family_name",
        Value: "User"
      },
      {
        Name: "email",
        Value: "test@user.com"
      },
      {
        Name: "phone_number",
        Value: "555-11111"
      }
    ]
  });
}

export const getAllUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(FAKE_ENDPOINT_GET_USERS)
      .then(response => {
        if (response.status === 200) {
          const { data = [] } = response;
          store.dispatch({
            type: USERS_ADD_LIST,
            payload: data
          });
          resolve(data);
        }
      })
      .catch(e => reject(e));
  });
};

export const updateUser = user => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${FAKE_ENDPOINT_GET_USERS}/${user.id}`, user)
      .then(response => {
        if (response.status === 200) {
          const { data = [] } = response;
          store.dispatch({
            type: USER_UPDATE,
            payload: data
          });
          resolve(data);
        }
      })
      .catch(e => reject(e));
  });
};

export const deleteMultipleUser = arUserId => {
  return axios
    .delete(`${FAKE_ENDPOINT_GET_USERS}/${arUserId.join(",")}`, {}) // this if fake for delete multiple user by Id
    .then(response => {
      if (response.status === 200) {
        store.dispatch({
          type: USER_DELETE_MULTIPLE,
          payload: arUserId
        });
      }
    });
};

export const deleteAllUser = () => {
  return axios
    .delete(`${FAKE_ENDPOINT_GET_USERS}/0`, {}) // this if fake for delete all user
    .then(response => {
      if (response.status === 200) {
        store.dispatch({
          type: USER_DELETE_ALL
        });
      }
    });
};
