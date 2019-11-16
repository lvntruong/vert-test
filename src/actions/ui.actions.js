import {
  UI_ADD_SNACKBAR
} from "./types";
import store from "../store";

export const addSnackBar = (text) => {
  return store.dispatch({
    type: UI_ADD_SNACKBAR,
    payload: text
  });
};