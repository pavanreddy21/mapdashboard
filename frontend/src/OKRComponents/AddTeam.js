import React, { Component } from "react";
import {
  Paper,
  withStyles,
  Typography,
  Divider,
  FormHelperText,
  TextField,
  Select,
  Input,
  MenuItem,
  Button
} from "@material-ui/core";

const styles = theme => ({
  paper: {
    marginLeft: "300px",
    marginRight: "300px",
    marginTop: "80px",
    height: "84%",
    overflow: "auto"
  },
  heading: {
    textAlign: "center",
    color: "#3F333F",
    paddingTop: "25px",
    paddingBottom: "25px"
  },
  padding1: {
    paddingTop: "25px"
  },
  padding2: {
    paddingTop: "10px"
  },
  subcontainer: {
    paddingLeft: "25px",
    paddingRight: "25px"
  },
  buttonsContainer: {
    backgroundColor: "12C08B",
    width: "100%",
    marginTop: "25px",
    marginBottom: "25px",
    display: "block"
  },
  button: {
    marginLeft: "17%",
    marginRight: "10%"
  }
});

class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      teamOwner: "",
      teamDetails: "",
      saveButtonDisabled: true
    };
  }
  handleTeamNameChange = event => {
    this.setState(
      {
        teamName: event.target.value
      },
      () => {
        if (this.state.teamName === "" || this.state.teamOwner === "") {
          this.setState({ saveButtonDisabled: true });
        } else {
          this.setState({ saveButtonDisabled: false });
        }
      }
    );
  };
  handleTeamPrimaryOwnerChange = event => {
    this.setState({ teamOwner: event.target.value }, () => {
      if (this.state.teamName === "" || this.state.teamOwner === "") {
        this.setState({ saveButtonDisabled: true });
      } else {
        this.setState({ saveButtonDisabled: false });
      }
    });
  };
  handleTeamDetailsChange = event => {
    this.setState({ teamDetails: event.target.value });
  };
  handleAddTeam = () => {
    let team = {
      name: this.state.teamName,
      ownerId: this.state.teamOwner,
      details: this.state.teamDetails,
      createdBy:this.props.userLoggedIn.id,
      updatedBy:this.props.userLoggedIn.id
    };
    this.props.addTeam(team);
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper elevation={1} className={classes.paper}>
          <Typography
            disableTypography
            variant="h4"
            className={classes.heading}
          >
            Add Teams
          </Typography>
          <Divider />
          <div className={classes.subcontainer}>
            <FormHelperText className={classes.padding1}>
              What is the TeamName?
            </FormHelperText>
            <TextField
              id="teamName"
              fullWidth
              variant="outlined"
              placeholder="e.g. Marvel Avengers"
              className={classes.padding2}
              onChange={this.handleTeamNameChange}
            />
            {this.state.teamName === "" ? (
              <FormHelperText>Team Name is Required</FormHelperText>
            ) : (
              <p />
            )}
            <FormHelperText className={classes.padding1}>
              Primary Owner
            </FormHelperText>

            <Select
              fullWidth
              onChange={this.handleTeamPrimaryOwnerChange}
              value={this.state.teamOwner}
              inputProps={{
                name: "type",
                id: "type-simple"
              }}
            >
              {this.props.users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName + " " + user.lastName}
                </MenuItem>
              ))}
            </Select>
            {this.state.teamOwner === "" ? (
              <FormHelperText>Team Owner is Required</FormHelperText>
            ) : (
              <p />
            )}

            <FormHelperText className={classes.padding1}>
              Details (optional)
            </FormHelperText>
            <TextField
              id="teamDescription"
              fullWidth
              variant="outlined"
              className={classes.padding2}
              onChange={this.handleTeamDetailsChange}
            />
            <div className={classes.buttonsContainer}>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={this.props.handleCloseAddTeamModal}
              >
                <Typography
                  disableTypography
                  style={{ textAlign: "center", color: "#12C08B" }}
                >
                  Cancel
                </Typography>
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                disabled={this.state.saveButtonDisabled}
                onClick={this.handleAddTeam}
              >
                <Typography
                  disableTypography
                  style={{ textAlign: "center", color: "#12C08B" }}
                >
                  Save and Close
                </Typography>
              </Button>
            </div>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddTeam);
