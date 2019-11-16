import deepFreeze from "deep-freeze";
import usersReducer from "./usersReducer";
import {
  USERS_ADD_LIST,
  USER_UPDATE,
  USER_DELETE_MULTIPLE,
  USER_DELETE_ALL
} from "../actions/types";
import users from "../tests/mocks/users";

const testError = new Error("TEST");

const userUpdate = {
  ...users[0],
  name: "Test Name!"
};

const arUserId = [1, 2, 3];

// *------------------- states--------------------------- */
const users_initial_state = [];
const users_after_initial_state = users;
// *------------------- actions--------------------------- */
const users_add_list_action = {
  type: USERS_ADD_LIST,
  payload: users
};

const user_update_action = {
  type: USER_UPDATE,
  payload: userUpdate
};

const user_delete_all_action = {
  type: USER_DELETE_ALL
};

const user_delete_one_action = {
  type: USER_DELETE_MULTIPLE,
  payload: [1]
};

const user_delete_multiple_action = {
  type: USER_DELETE_MULTIPLE,
  payload: arUserId
};

// *------------- Making sure that our reducer won't mutate our states------------ */
deepFreeze(users_initial_state);
// *------------- Making sure that our reducer won't mutate our actions------------ */
deepFreeze(users_add_list_action);
deepFreeze(user_update_action);
deepFreeze(user_delete_multiple_action);
deepFreeze(user_delete_all_action);
deepFreeze(user_delete_one_action);

it("should set all the user information to users store", () => {
  expect(usersReducer(users_initial_state, users_add_list_action)).toEqual(
    users
  );
});

it("should set the name to first user", () => {
  const usersAfterUpdate = [
    ...users.filter(_user => _user.id !== userUpdate.id),
    userUpdate
  ];
  expect(usersReducer(users_after_initial_state, user_update_action)).toEqual(
    usersAfterUpdate
  );
});

it("should delete the user with id = 1", () => {
  const usersAfterDelete = [...users.filter(_user => _user.id !== 1)];
  expect(
    usersReducer(users_after_initial_state, user_delete_one_action)
  ).toEqual(usersAfterDelete);
});

it("should delete multiple user", () => {
  const usersAfterDelete = [
    ...users.filter(_user => arUserId.indexOf(_user.id) === -1)
  ];
  expect(
    usersReducer(users_after_initial_state, user_delete_multiple_action)
  ).toEqual(usersAfterDelete);
});

it("should delete all the user", () => {
  const usersAfterDelete = [];
  expect(
    usersReducer(users_after_initial_state, user_delete_all_action)
  ).toEqual(usersAfterDelete);
});
