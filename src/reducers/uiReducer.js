import { UI_ADD_SNACKBAR } from "../actions/types";

const initialState = {
  snackBar: {
    duration: 10000,
    text: null
  }
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UI_ADD_SNACKBAR:
      return {
        ...state,
        snackBar: { ...state.snackBar, text: action.payload }
      };
    default:
      return state;
  }
}
