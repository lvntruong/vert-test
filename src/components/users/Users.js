import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { RaisedButton, LinearProgress } from "material-ui";
import FontIcon from "material-ui/FontIcon";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentEdit from "material-ui/svg-icons/editor/mode-edit";
import ContentDelete from "material-ui/svg-icons/action/delete";
import ContentView from "material-ui/svg-icons/image/remove-red-eye";
import ModalUser from "./modalUser";
import {
  updateUser,
  deleteUser,
  deleteMultipleUser,
  deleteAllUser
} from "../../actions/user.actions";
import { addSnackBar } from "../../actions/ui.actions";

class Users extends Component {
  state = {
    userSelected: [],
    openDialogType: "",
    currentUserSelected: null
  };

  handleToggle = value => {
    this.setState({
      userSelected: value === "all" || value === "none" ? [] : [...value]
    });
  };

  handleOnClickAction = (e, type, row) => {
    e.stopPropagation();
    switch (type) {
      case "view":
        this.setState({ openDialogType: "view", currentUserSelected: row });
        break;
      case "edit":
        this.setState({ openDialogType: "edit", currentUserSelected: row });
        break;
      case "delete":
        addSnackBar("Deleting...");
        deleteUser(row).then(() => {
          this.handleSuccess();
          this.setState({ userSelected: [] });
        });
        break;
      default:
        break;
    }
  };

  handleCloseModalUser = () => {
    this.setState({ openDialogType: "", currentUserSelected: null });
  };

  handleUpdateUser = user => {
    addSnackBar("Updating...");
    this.handleCloseModalUser();
    updateUser(user).then(() => {
      this.handleSuccess();
    });
  };

  handleMultipleDelete = () => {
    const { users = [] } = this.props;
    const { userSelected } = this.state;
    if (userSelected.length === 0) {
      addSnackBar("Deleting all user...");
      deleteAllUser().then(() => this.handleSuccess());
    } else {
      const arUserSelected = userSelected.map(_id => users[_id].id);
      deleteMultipleUser(arUserSelected).then(() => {
        this.setState({
          userSelected: []
        });
      });
    }
  };

  handleSuccess = () => addSnackBar("Success!");

  render() {
    const { userSelected, openDialogType, currentUserSelected } = this.state;
    const { users = [] } = this.props;

    return (
      <div>
        <Table
          height={"300px"}
          fixedHeader
          fixedFooter
          selectable
          multiSelectable
          onRowSelection={this.handleToggle}
        >
          <TableHeader displaySelectAll adjustForCheckbox enableSelectAll>
            <TableRow>
              <TableHeaderColumn
                colSpan="6"
                // tooltip=""
                style={{ textAlign: "right" }}
              >
                <RaisedButton
                  onClick={this.handleMultipleDelete}
                  label={
                    userSelected.length > 0
                      ? `Delete ${userSelected.length} user${
                          userSelected.length > 1 ? "s" : ""
                        }`
                      : "Delete All"
                  }
                  secondary={true}
                  style={{
                    margin: 12
                  }}
                  icon={<FontIcon className="muidocs-icon-custom-github" />}
                />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Username">
                Username
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Email">Email</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Phone">Phone</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Phone">Website</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Phone">Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {users
              .sort((a, b) => a.id - b.id)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  selected={userSelected.indexOf(index) > -1}
                >
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.username}</TableRowColumn>
                  <TableRowColumn>{row.email}</TableRowColumn>
                  <TableRowColumn>{row.phone}</TableRowColumn>
                  <TableRowColumn>{row.website}</TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton
                      mini={true}
                      onClick={e => this.handleOnClickAction(e, "view", row)}
                    >
                      <ContentView />
                    </FloatingActionButton>
                    <FloatingActionButton
                      mini={true}
                      backgroundColor={"green"}
                      onClick={e => this.handleOnClickAction(e, "edit", row)}
                    >
                      <ContentEdit />
                    </FloatingActionButton>
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      onClick={e => this.handleOnClickAction(e, "delete", row)}
                    >
                      <ContentDelete />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!!openDialogType && (
          <ModalUser
            open
            type={openDialogType}
            user={currentUserSelected}
            handleClose={this.handleCloseModalUser}
            handleOnSave={this.handleUpdateUser}
          />
        )}
      </div>
    );
  }
}

export default connect(store => {
  return {
    users: store.users
  };
})(Users);
