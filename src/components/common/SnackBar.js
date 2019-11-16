import React from "react";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";

class SnackbarComponent extends React.Component {
 
  render() {
    const { duration, text } = this.props.snackBar;

    return (
      <div>
        {text && <Snackbar
          open={true}
          message={text}
          autoHideDuration={duration}
          onRequestClose={this.handleRequestClose}
        />}
      </div>
    );
  }
}

export default connect(store => {
  return {
    snackBar: store.ui.snackBar
  };
})(SnackbarComponent);
