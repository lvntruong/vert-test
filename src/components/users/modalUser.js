import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

export default class ModalUser extends React.Component {
  handleOnChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSave = () => {
    const { user, handleOnSave = () => {} } = this.props;
    const userUpdate = { ...user, ...this.state };
    handleOnSave(userUpdate);
  };

  render() {
    const { open, type, user, handleClose = () => {} } = this.props;
    const isViewOnly = type === "view";

    const actions = !isViewOnly
      ? [
          <FlatButton label="Cancel" primary={true} onClick={handleClose} />,
          <FlatButton
            label="Submit"
            primary={true}
            // keyboardFocused={true}
            onClick={this.handleOnSave}
          />
        ]
      : [];

    return (
      <div>
        <Dialog
          title="Infomation User"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
        >
          {["Name", "Username", "Email", "Phone", "Website"].map(_item => (
            <React.Fragment key={_item}>
              <TextField
                name={_item.toLocaleLowerCase()}
                hintText={_item}
                floatingLabelText={_item}
                defaultValue={user[_item.toLocaleLowerCase()]}
                disabled={isViewOnly}
                onChange={this.handleOnChangeInput}
              />
              <br />
            </React.Fragment>
          ))}
        </Dialog>
      </div>
    );
  }
}
