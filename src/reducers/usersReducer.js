import { USERS_ADD_LIST } from "../actions/types";

const initialState = [];
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_ADD_LIST:
      return action.payload;
    default:
      return state;
  }
}
