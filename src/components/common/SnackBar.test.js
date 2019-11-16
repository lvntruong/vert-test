import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import SnackBar, { SnackbarComponent } from "./SnackBar";
import store from "../../store";
import { addSnackBar } from "../../actions/ui.actions";

configure({ adapter: new Adapter() });

const CUSTOM_TEXT = "Lorem ipsum dolor sit amet";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <SnackBar />
      </Provider>
    </MuiThemeProvider>,
    div
  );
});

describe("Test SnackBar", () => {
  let wrapper;

  it("renders the snackBar with custom text", () => {
    addSnackBar(CUSTOM_TEXT);
    wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <SnackBar />
        </Provider>
      </MuiThemeProvider>
    );
    expect(
      wrapper
        .find(SnackbarComponent)
        .children()
        .children()
        .props("message").message
    ).toEqual(CUSTOM_TEXT);
  });

});
