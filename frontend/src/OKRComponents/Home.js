import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SideBar from "./SideBar";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import axios from "axios";
import { Divider } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Dashboard from "./Dashboard/Dashboard";
import AddObjective from "./AddObjective";
import AddTeam from "./AddTeam";

const drawerWidth = 290;

const styles = theme => ({
  card: {
    minWidth: 275
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  search: {
    marginLeft: "80%",
    marginRight: "5px",
    background: "white",
    color: "black"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "white"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "block"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#41A4E5",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: "#41A4E5",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: "800px",
    width: "auto !important",

    height: "100%",
    overflowX: "hidden"
  },
  sideBar: {
    backgroundColor: "#41A4E5"
  },
  sideBarHeader: {
    color: "white",
    align: "left",
    marginRight: "58%"
  },
  modal: {
    marginLeft: "25px",
    marginRight: "25px",
    marginTop: "25px",
    marginBottom: "25px"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTeamModalOpen: false,
      drawerOpened: true,
      addObjectiveModalOpen: false,
      objectivesPresent: true,
      organizationObjectivesPresent: true,
      objectives: [],
      orgObjectives: [],
      userLoggedIn: [],
      users: [],
      organization: "ZMS",
      completedProgress: 0,
      expectedProgress: 15,
      year: "2019",
      quater: "",
      objectiveAlignTo: "",
      teams: [],
      currentTeam: "",
      teamObjectives: [],
      teamObjectivesPresent: false
    };
  }
  handleToggleDrawer = () => {
    this.setState({ drawerOpened: !this.state.drawerOpened });
  };

  handleAddObjectiveModalOpen = (objectiveAlignTo = "") => {
    this.setState({
      addObjectiveModalOpen: true,
      objectiveAlignTo: objectiveAlignTo
    });
  };

  handleAddObjectiveModalClose = () => {
    this.setState({ addObjectiveModalOpen: false, objectiveAlignTo: "" });
  };
  handleOpenAddTeamModal = () => {
    this.setState({ addTeamModalOpen: true });
  };
  handleCloseAddTeamModal = () => {
    this.setState({ addTeamModalOpen: false });
  };

  setCurrentTeam = team => {
    this.setState({ currentTeam: team }, () => {
      this.FetchAndSetTeamObjectives(team.id);
    });
  };
  resetCurrentTeam = () => {
    this.setState({ currentTeam: "" });
  };
  FetchAndSetTeamObjectives = teamId => {
    axios
      .get("http://localhost:8080/api/teamObjectives/" + teamId)
      .then(response => {
        if (response.data.length === 0)
          this.setState({ teamObjectivesPresent: false });
        else {
          this.setState({ teamObjectives: response.data }, () => {
            this.setState({ teamObjectivesPresent: true });
          });
        }
      });
  };
  fetchAndSetOrganizationObjectives = () => {
    axios
      .get("http://localhost:8080/api/objectives/organization")
      .then(response => {
        if (response.data.length === 0)
          this.setState({ organizationObjectivesPresent: false });
        else {
          this.setState({ orgObjectives: response.data }, () => {
            this.setState({ organizationObjectivesPresent: true });
          });
        }
      });
  };

  fetchAndSetUsers = () => {
    axios.get("http://localhost:8080/api/users").then(response => {
      this.setState(
        { users: response.data, userLoggedIn: response.data[0] },
        () => this.fetchAndSetIndividualObjectives(this.state.userLoggedIn)
      );
    });
  };
  fetchAndSetIndividualObjectives = user => {
    axios
      .get("http://localhost:8080/api/objectives/individual/" + user.id)
      .then(response => {
        if (response.data.length === 0) {
          this.setState({ objectivesPresent: false });
        } else {
          this.setState({ objectives: response.data }, () => {
            this.setState({ objectivesPresent: true });
          });
        }
      });
  };
  fetchAndSetTeams = () => {
    axios.get("http://localhost:8080/api/teams").then(response => {
      if (response.data.length > 0) {
        this.setState({ teams: response.data });
      }
    });
  };

  fetchAndSetTeamObjectives = () => {
    if (this.state.currentTeam !== "") {
      axios
        .get(
          "http://localhost:8080/api/teamObjectives/" +
            this.state.currentTeam.id
        )
        .then(response => {
          if (response.data.length > 0) {
            this.setState({ teamObjectives: response.data }, () => {
              this.setState({ teamObjectivesPresent: true });
            });
          }
        });
    }
  };

  filterObjectives = (startDate, endDate) => {
    axios
      .get(
        "http://localhost:8080/api/objectives/individual/" +
          this.state.userLoggedIn.id
      )
      .then(response => {
        let objectivesPresent = false;
        let objectives = response.data;
        const filteredObjectives = objectives.filter(
          objective =>
            objective.startDate === startDate && objective.endDate === endDate
        );
        if (filteredObjectives.length > 0) {
          objectivesPresent = true;
        }

        this.setState({ objectives: filteredObjectives }, () => {
          this.setState({ objectivesPresent: objectivesPresent });
        });
      });
  };

  filterOrganizationObjectives = (startDate, endDate) => {
    axios
      .get("http://localhost:8080/api/objectives/organization/")
      .then(response => {
        let orgObjectivesPresent = false;
        let orgObjectives = response.data;
        const filteredOrgObjectives = orgObjectives.filter(
          objective =>
            objective.startDate === startDate && objective.endDate === endDate
        );
        if (filteredOrgObjectives.length > 0) {
          orgObjectivesPresent = true;
        }
        this.setState({ orgObjectives: filteredOrgObjectives }, () => {
          this.setState({
            organizationObjectivesPresent: orgObjectivesPresent
          });
        });
      });
  };
  filterTeamObjectives = (startDate, endDate) => {
    if (this.state.currentTeam !== "") {
      axios
        .get(
          "http://localhost:8080/api/teamObjectives/" +
            this.state.currentTeam.id
        )
        .then(response => {
          let teamObjectivesPresent = false;
          let teamObjectives = response.data;
          const filteredTeamObjectives = teamObjectives.filter(
            objective =>
              objective.startDate === startDate && objective.endDate === endDate
          );
          if (filteredTeamObjectives.length > 0) {
            teamObjectivesPresent = true;
          }
          this.setState({ teamObjectives: filteredTeamObjectives }, () => {
            this.setState({
              teamObjectivesPresent: teamObjectivesPresent
            });
          });
        });
    }
  };
  componentDidMount = () => {
    this.fetchAndSetOrganizationObjectives();
    this.fetchAndSetUsers();
    this.fetchAndSetTeams();
  };

  handleAddObjective = objective => {
    let objectiveToSend = JSON.stringify(objective);
    let addedObjective = null;
    return axios
      .post("http://localhost:8080/api/objectives", objectiveToSend, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        addedObjective = response.data;
        this.fetchAndSetIndividualObjectives(this.state.userLoggedIn);
        this.fetchAndSetOrganizationObjectives();
        this.fetchAndSetTeamObjectives();
        return addedObjective;
      });
  };

  changeTimePeriod = quater => {
    this.setState({ quater: quater }, () => {
      let startDate = "";
      let endDate = "";
      let year = "2019";
      if (this.state.quater === "Q1") {
        startDate = year + "-01-01";
        endDate = year + "-03-31";
      } else if (this.state.quater === "Q2") {
        startDate = year + "-04-01";
        endDate = year + "-06-30";
      } else if (this.state.quater === "Q3") {
        startDate = year + "-07-01";
        endDate = year + "-09-30";
      } else if (this.state.quater === "Q4") {
        startDate = year + "-10-01";
        endDate = year + "-12-31";
      } else {
        startDate = year + "-01-01";
        endDate = year + "-12-31";
      }
      this.filterObjectives(startDate, endDate);
      this.filterOrganizationObjectives(startDate, endDate);
      this.filterTeamObjectives(startDate, endDate);
    });
  };
  deleteObjective = objectiveId => {
    axios
      .delete("http://localhost:8080/api/objectives/" + objectiveId, {
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        this.fetchAndSetIndividualObjectives();
        this.fetchAndSetOrganizationObjectives();
        this.fetchAndSetTeamObjectives();
      });
  };
  updateObjective = (objectiveId, updatedObjective) => {
    axios.put(
      "http://localhost:8080/api/objectives/" + objectiveId,
      updatedObjective,
      { headers: { "Content-Type": "application/json" } }
    );
  };

  handleChangeObjectiveTitle = (objective, title) => {
    objective["title"] = title;
    if (objective["objectiveParentId"] === null) {
      delete objective["objectiveParentId"];
    }
    objective["updatedBy"] = this.state.userLoggedIn.id;
    this.updateObjective(objective.id, objective);
  };

  handleChangeObjectiveQuarter = (objective, quarter) => {
    let startDate, endDate;
    let year = "2019";
    if (quarter === "Q1") {
      startDate = year + "-01-01";
      endDate = year + "-03-31";
    } else if (quarter === "Q2") {
      startDate = year + "-04-01";
      endDate = year + "-06-30";
    } else if (quarter === "Q3") {
      startDate = year + "-07-01";
      endDate = year + "-09-30";
    } else if (quarter === "Q4") {
      startDate = year + "-10-01";
      endDate = year + "-12-31";
    } else {
      startDate = year + "-01-01";
      endDate = year + "-12-31";
    }
    objective["startDate"] = startDate;
    objective["endDate"] = endDate;
    if (objective["objectiveParentId"] === null) {
      delete objective["objectiveParentId"];
    }
    objective["updatedBy"] = this.state.userLoggedIn.id;
    this.updateObjective(objective.id, objective);
  };
  handleAddTeam = team => {
    axios
      .post("http://localhost:8080/api/teams", team, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        this.fetchAndSetTeams();
      });
    this.handleCloseAddTeamModal();
  };
  render() {
    const { classes, theme } = this.props;
    const { firstName } = this.state.userLoggedIn;
    let userIcon;
    if (firstName !== undefined)
     userIcon = firstName.charAt(0);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.drawerOpened
          })}
        >
          <Toolbar disableGutters={!this.state.drawerOpened}>
            <IconButton
              aria-label="Open drawer"
              onClick={this.handleToggleDrawer}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.drawerOpened
              })}
            >
              <MenuIcon />
            </IconButton>
            <Avatar className={classes.search}>
              <i className="fas fa-search" />
            </Avatar>
            <Avatar className={classes.orangeAvatar}>{userIcon}</Avatar>
          </Toolbar>
          )
          <Divider />
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.drawerOpened,
            [classes.drawerClose]: !this.state.drawerOpened
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.drawerOpened,
              [classes.drawerClose]: !this.state.drawerOpened
            })
          }}
          open={this.state.drawerOpened}
        >
          <div className={classes.toolbar}>
            {theme.direction === "rtl" ? (
              <p> </p>
            ) : (
              <Typography className={classes.sideBarHeader} variant="h6" noWrap>
                ZEMOSO
              </Typography>
            )}
          </div>
          <SideBar
            organization={this.state.organization}
            className={classes.sideBar}
            handleOpenAddTeamModal={this.handleOpenAddTeamModal}
            teams={this.state.teams}
            setCurrentTeam={this.setCurrentTeam}
            resetCurrentTeam={this.resetCurrentTeam}
          />
        </Drawer>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Dashboard
                classes={classes}
                year={this.state.year}
                quater={this.state.quater}
                completedProgress={this.state.completedProgress}
                expectedProgress={this.state.expectedProgress}
                changeTimePeriod={this.changeTimePeriod}
                objectives={this.state.objectives}
                user={this.state.userLoggedIn}
                objectivesPresent={this.state.objectivesPresent}
                deleteObjective={this.deleteObjective}
                handleChangeObjectiveTitle={this.handleChangeObjectiveTitle}
                orgObjectives={this.state.orgObjectives}
                handleAddObjectiveModalOpen={this.handleAddObjectiveModalOpen}
                handleChangeObjectiveQuarter={this.handleChangeObjectiveQuarter}
              />
            )}
          />
          <Route
            exact
            path="/orgokr"
            component={() => (
              <Dashboard
                classes={classes}
                year={this.state.year}
                quater={this.state.quater}
                completedProgress={this.state.completedProgress}
                expectedProgress={this.state.expectedProgress}              
                changeTimePeriod={this.changeTimePeriod}
                objectives={this.state.orgObjectives}
                user={{
                  firstName: "ZMS",
                  lastName: "Organization",
                  isOrganization: this.state.userLoggedIn.isOrganization,
                  id: this.state.userLoggedIn.id
                }}
                objectivesPresent={this.state.organizationObjectivesPresent}
                deleteObjective={this.deleteObjective}
                handleChangeObjectiveTitle={this.handleChangeObjectiveTitle}
                handleAddObjectiveModalOpen={this.handleAddObjectiveModalOpen}
                handleChangeObjectiveQuarter={this.handleChangeObjectiveQuarter}
              />
            )}
          />
          <Route
            path="/team/:id"
            component={({ match }) => (
              <Dashboard
                classes={classes}
                year={this.state.year}
                quater={this.state.quater}
                completedProgress={this.state.completedProgress}
                expectedProgress={this.state.expectedProgress}   
                changeTimePeriod={this.changeTimePeriod}
                objectives={this.state.teamObjectives}
                user={this.state.userLoggedIn}
                objectivesPresent={this.state.teamObjectivesPresent}
                deleteObjective={this.deleteObjective}
                handleChangeObjectiveTitle={this.handleChangeObjectiveTitle}
                orgObjectives={this.state.orgObjectives}
                handleAddObjectiveModalOpen={this.handleAddObjectiveModalOpen}
                handleChangeObjectiveQuarter={this.handleChangeObjectiveQuarter}
                team={this.state.currentTeam}
              />
            )}
          />
        </Switch>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.addObjectiveModalOpen}
          onClose={this.handleAddObjectiveModalClose}
          className={classes.modal}
          disableBackdropClick
        >
          <AddObjective
            userIcon={userIcon}
            user={this.state.userLoggedIn}
            handleClose={this.handleAddObjectiveModalClose}
            handleAddObjective={this.handleAddObjective}
            objectiveAlignTo={this.state.objectiveAlignTo}
            team={this.state.currentTeam}
          />
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.addTeamModalOpen}
          onClose={this.handleCloseAddTeamModal}
          className={classes.modal}
          disableBackdropClick
        >
          <AddTeam
            handleCloseAddTeamModal={this.handleCloseAddTeamModal}
            addTeam={this.handleAddTeam}
            users={this.state.users}
            userLoggedIn={this.state.userLoggedIn}
          />
        </Modal>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
