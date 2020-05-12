import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = ()=> ({
  
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500],
    marginRight: "5px"
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  grid: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    display: "flex"
  },
  margin: {
    marginRight: 10
  },
  addButton: {
    marginRight: "10px",
    backgroundColor: "#12C08B"
  },
  plusIcon: {
    color: "white"
  },
  heading:{
      textAlign: "left",
      fontFamily: "Roboto",
      fontWeight: 400
  },
  rightIcon:{
     backgroundColor: "#ffffff",
      float: "right" 
  },
  leftIcon:{
    backgroundColor: "#ffffff",
    float: "left" 
  },
  Card:{
     borderRadius: 50,
      height: "67%",
       marginRight: "10px" 
  },
  gridIcons:{
    display: "flex",
     float: "right" 
  },
  marginTop:{
    marginTop: 12
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTime: false,
      show: "hidden",
      year: "",
      quater: ""
    };
  }
  componentDidMount() {
    this.setState({ year: this.props.year, quater: this.props.quater });
  }

  addNewObjective=() =>{
    this.props.handleAddObjectiveModalOpen();
  }

  open() {
    this.setState({ openObjModal: false });
  }

  handleChangeTime(event) {
    let val = event.target.value;
    if (val === "Annual") this.setState({ quater: "" });
    else this.setState({ quater: event.target.value  });
    this.props.changeTimePeriod(val);
  }

  handleCloseTime() {
    this.setState({ openTime: false });
    this.setState({ show: "hidden" });
  }

  handleOpenTime() {
    this.setState({ openTime: true });
    this.setState({ show: "block" });
  }

  moveForward() {
    let quater = this.state.quater;
    if (quater === "Q1") quater="Q2";
    else if (quater === "Q2") quater="Q3";
    else if (quater === "Q3") quater="Q4";
    this.setState({quater},()=>{this.props.changeTimePeriod(quater)});
  }

  moveBackward() {
    let quater = this.state.quater;
    if (quater === "Q4") quater="Q3";
    else if (quater === "Q3") quater="Q2";
    else if (quater === "Q2") quater="Q1";
    this.setState({quater},()=>{this.props.changeTimePeriod(quater)});
  }

  render() {
    const { user } = this.props;
    const { classes } = this.props;
    const { team } = this.props;
    const show = this.state.show;
    let heading;

    heading = user.firstName;
    if (team !== null) {
      heading = team.name;
    }

    let userIcon;
    if (heading == null) console.log(heading);
    else userIcon = heading.charAt(0);

    return (
      <React.Fragment>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            container
            item
            xs={1}
            justify="flex-start"
            alignItems="flex-start"
          >
            <Avatar
              className={classes.orangeAvatar}
            >
              {userIcon}
            </Avatar>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography
              noWrap
              component="h4"
              variant="h4"
              gutterBottom
              className={classes.heading}
            >
              {heading}
            </Typography>
          </Grid>
          <Grid item xs={3} >
            <Card
            className={classes.Card}
            >
              <Grid container wrap="nowrap">
                <Grid item xs={3} >
                  <Fab
                    size="small"
                    onClick={this.moveBackward.bind(this)}
                    className={classes.leftIcon}
                  >
                    <KeyboardArrowLeftIcon />
                  </Fab>
                </Grid>
                <Grid
                  item
                  xs={5}
                  onClick={this.handleOpenTime.bind(this)}
                  className={classes.marginTop}
                >
                  <Typography style={{ textAlign: "center" }}>
                    {this.state.quater}
                    {this.state.year}
                  </Typography>
                </Grid>
                <Grid item xs={1} className={classes.marginTop}>
                  <KeyboardArrowDownIcon
                    onClick={this.handleOpenTime.bind(this)}
                  />
                  <Select
                    style={{ display: show }}
                    onClose={this.handleCloseTime.bind(this)}
                    onOpen={this.handleOpenTime.bind(this)}
                    onChange={this.handleChangeTime.bind(this)}
                    value={this.props.quater}
                    open={this.state.openTime}
                    displayEmpty
                  >
                    <MenuItem value={"Annual"}>Annual 2019</MenuItem>
                    <MenuItem value={"Q1"}>Q1 2019</MenuItem>
                    <MenuItem value={"Q2"}>Q2 2019</MenuItem>
                    <MenuItem value={"Q3"}>Q3 2019</MenuItem>
                    <MenuItem value={"Q4"}>Q4 2019</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Fab
                    size="small"
                    className={classes.rightIcon}
                  >
                    <KeyboardArrowRightIcon
                      onClick={this.moveForward.bind(this)}
                    />
                  </Fab>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={2}
          className={classes.gridIcons}
           >
            <Fab
              size="small"
              className={classes.addButton}
              onClick={this.addNewObjective}
            >
              <AddIcon className={classes.plusIcon} />
            </Fab>

            <Fab size="small" className={classes.margin}>
              <i className="fas fa-star" />
            </Fab>
            <Fab size="small">
              <i className="fas fa-ellipsis-h" />
            </Fab>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
