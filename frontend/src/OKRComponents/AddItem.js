import React, { Component } from "react";
//  import PropTypes from 'prop-types';
//  import classNames from 'classnames';
//  import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//     outline: 'none',
//   },

// });

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      date: false,
      show: "none",
      time: ""
    };
  }
  componentDidMount() {
    this.setState({ time: this.props.quater });
    //  console.log(this.state.time)
  }

  handleOpen = () => {
    //  this.setState({ open: true });
    this.props.handleAddObjectiveModalOpen();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  open() {
    this.setState({ open: false });
  }

  handleChangeTimePeriod(event) {
    let t = event.target.value;
    this.setState({ time: event.target.value + " " });
    this.props.changeTimePeriod(t + " add");
  }

  handleCloseTimePeriod(event) {
    let qt = event.target.value;
    this.setState({ date: false });
    this.setState({ show: "none" });
    this.props.changeTimePeriod(qt + " add");
  }

  handleOpenTimePeriod() {
    this.setState({ date: true });
    this.setState({ show: "block" });
  }

  render() {
    const show = this.state.show;
    const time = this.props.quater;
    const firstName = this.props.user.firstName;
    let V;
    if (firstName == null) console.log(firstName);
    else V = firstName.charAt(0);
    return (
      <React.Fragment>
        <div style={{ marginTop: "25px", marginBottom: "25px" }}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", color: "#41A4E5" }}
          >
            Start adding Objectives and Key Results
          </Typography>
        </div>
        <Button
          style={{
            textTransform: "none",
            marginLeft: "25%",
            marginRight: "50%",
            width: " 50%"
          }}
          onClick={this.handleOpen}
        >
          <Card style={{ height: "50px", width: " 100%", align: "center" }}>
            <CardContent
              justify="center"
              style={{ backgroundColor: "#12C08B" }}
            >
              <Typography style={{ textAlign: "center", color: "white" }}>
                Click Here to add new objective
              </Typography>
            </CardContent>
          </Card>
        </Button>
        <div style={{ marginTop: "25px", marginBottom: "25px" }}>
          <Typography style={{ textAlign: "center", color: "#12C08B" }}>
            OR
          </Typography>
        </div>
        <Button
          color="#12C08B"
          style={{
            textTransform: "none",
            marginLeft: "25%",
            marginRight: "50%",
            width: " 50%"
          }}
        >
          <Card style={{ height: "50px", width: " 100%", align: "center" }}>
            <CardContent
              style={{ backgroundColor: "#12C08B" }}
            >
              <Typography
                style={{ textAlign: "center", color: "white" }}
              >
                See sample OKRs
              </Typography>
            </CardContent>
          </Card>
        </Button>
        <div style={{ marginTop: "50px", marginBottom: "25px" }}>
          <Typography
            variant="h6"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center"
            }}
          >
            Can’t find what you’re looking for?{" "}
          </Typography>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Typography style={{ textAlign: "center" }}>
            You’re currently only seeing objectives that are assigned to Annual
            time period.
          </Typography>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <Typography style={{ textAlign: "center" }}>
            You can change the time period to see other objectives.{" "}
          </Typography>
        </div>
        <Button
          onClick={this.handleOpenTimePeriod.bind(this)}
          style={{
            marginLeft: "40%",
            marginRight: "auto",
            textAlign: "center"
          }}
        >
          <Typography
            style={{ textAlign: "center", color: "#12C08B" }}
          >
            Change Time Period{" "}
          </Typography>
        </Button>
        <Select
          style={{ display: show, paddingLeft: "50%" }}
          onClose={this.handleCloseTimePeriod.bind(this)}
          onOpen={this.handleOpenTimePeriod.bind(this)}
          onChange={this.handleChangeTimePeriod.bind(this)}
          value={time}
          open={this.state.date}
          displayEmpty
        >
          <MenuItem value={"Annual"}>Annual 2019</MenuItem>
          <MenuItem value={"Q1"}>Q1 2019</MenuItem>
          <MenuItem value={"Q2"}>Q2 2019</MenuItem>
          <MenuItem value={"Q3"}>Q3 2019</MenuItem>
          <MenuItem value={"Q4"}>Q4 2019</MenuItem>
        </Select>
      </React.Fragment>
    );
  }
}

export default AddItem;
