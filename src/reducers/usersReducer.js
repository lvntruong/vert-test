import {
  USERS_ADD_LIST,
  USER_UPDATE,
  USER_DELETE_MULTIPLE,
  USER_DELETE_ALL
} from "../actions/types";

const initialState = [];
export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case USERS_ADD_LIST:
      return action.payload;
    case USER_UPDATE:
      const userUpdate = action.payload;
      newState = [
        ...state.filter(_user => _user.id !== userUpdate.id),
        userUpdate
      ];
      return newState;
    case USER_DELETE_MULTIPLE:
      newState = [
        ...state.filter(_user => action.payload.indexOf(_user.id) === -1)
      ];
      return newState;
    case USER_DELETE_ALL:
      return [];
    default:
      return state;
  }
}
