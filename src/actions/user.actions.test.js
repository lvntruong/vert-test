import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { getAllUser, FAKE_ENDPOINT_GET_USERS } from "./user.actions";
import {} from "../actions/types";
import users from '../tests/mocks/users';

let mock;
beforeEach(() => {
  // This sets the mock adapter on the default instance
  mock = new MockAdapter(axios);
  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet(FAKE_ENDPOINT_GET_USERS).reply(200, users);
});

describe("Get all user data, save to store", () => {
  it("should get all the user data from server", async () => {
    const users = await getAllUser();
    expect(users).toEqual(users);
  });
});

// TODO: write for all actions