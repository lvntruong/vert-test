import deepFreeze from "deep-freeze";
import uiReducer from "./uiReducer";
import { UI_ADD_SNACKBAR } from "../actions/types";

const CUSTOM_TEXT = "Lorem ipsum dolor sit amet";

// *------------------- states--------------------------- */
const snackBar_initial_state = {
  snackBar: {
    duration: 4000,
    text: null
  }
};

const snackBar_after_add_new_state = {
  snackBar: {
    duration: 4000,
    text: CUSTOM_TEXT
  }
};
// *------------------- actions--------------------------- */
const snackBar_add_action = {
  type: UI_ADD_SNACKBAR,
  payload: CUSTOM_TEXT
};



// *------------- Making sure that our reducer won't mutate our states------------ */
deepFreeze(snackBar_initial_state);
deepFreeze(snackBar_after_add_new_state);
// *------------- Making sure that our reducer won't mutate our actions------------ */
deepFreeze(snackBar_add_action);

it("should set new custom text to ui.snackBar store", () => {
  expect(uiReducer(snackBar_initial_state, snackBar_add_action)).toEqual(
    snackBar_after_add_new_state
  );
});