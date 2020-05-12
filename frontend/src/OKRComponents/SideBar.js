import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Teams from "./Teams";

const styles = theme => ({
  card: {
    backgroundColor: "#41A4E5"
  },
  icon: {
    color: "white",
    fontWeight: "lighter"
  },
  cardText: {
    color: "white",
    fontWeight: "lighter",
    fontSize: "15px"
  },
  button: {
    backgroundColor: "white"
  },
  noDecoration: {
    textDecoration: "none"
  }
});

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBasicOptions: true,
      showTeams: false
    };
  }
  toggleShowTeams = () => {
    this.setState({
      showBasicOptions: !this.state.showBasicOptions,
      showTeams: !this.state.showTeams
    });
  };
  render() {
    const { classes } = this.props;
    let organization = this.props.organization;
    organization = organization + " " + "OKRs";

    return (
      <React.Fragment>
        {this.state.showBasicOptions ? (
          <List className={classes.card}>
            <Card
              className={classes.card}
              onClick={this.props.resetCurrentTeam}
            >
              <Link className={classes.noDecoration} to="/">
                <CardContent className={classes.card}>
                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <i className="far fa-user-circle" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.cardText}
                      disableTypography
                      primary="My OKRs "
                    />
                  </ListItem>
                </CardContent>
              </Link>
            </Card>
            <Card onClick={this.props.resetCurrentTeam}>
              <Link className={classes.noDecoration} to="/orgokr">
                <CardContent className={classes.card}>
                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <i className="fas fa-globe" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.cardText}
                      disableTypography
                      primary={organization}
                    />
                  </ListItem>
                </CardContent>
              </Link>
            </Card>
            <Card>
              <CardContent className={classes.card}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <i className="far fa-compass" />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.cardText}
                    disableTypography
                    primary="Objective Explorer"
                  />
                  <ListItemIcon className={classes.icon}>
                    <ArrowRightIcon />
                  </ListItemIcon>
                </ListItem>
              </CardContent>
            </Card>
            <Card onClick={this.toggleShowTeams}>
              <CardContent className={classes.card}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <i className="fas fa-users" />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.cardText}
                    disableTypography
                    primary="All Teams"
                  />
                  <ListItemIcon className={classes.icon}>
                    <ArrowRightIcon />
                  </ListItemIcon>
                </ListItem>
              </CardContent>
            </Card>
            <Card>
              <CardContent className={classes.card}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <i className="fas fa-users" />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.cardText}
                    disableTypography
                    primary="All Users"
                  />
                  <ListItemIcon className={classes.icon}>
                    <ArrowRightIcon />
                  </ListItemIcon>
                </ListItem>
              </CardContent>
            </Card>
          </List>
        ) : null}
        {this.state.showTeams ? (
          <React.Fragment>
            <List className={classes.card}>
              <Card onClick={this.toggleShowTeams}>
                <CardContent className={classes.card}>
                  <ListItem onClick={this.toggleShowTeams}>
                    <ListItemIcon className={classes.icon}>
                      <i className="material-icons">arrow_back</i>
                    </ListItemIcon>
                    <ListItemText
                      className={classes.cardText}
                      disableTypography
                      primary="Back To Main Menu"
                    />
                  </ListItem>
                </CardContent>
              </Card>
              <Card>
                <CardContent className={classes.card}>
                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <i class="fas fa-users" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.cardText}
                      disableTypography
                      primary="All Teams"
                    />
                  </ListItem>
                </CardContent>
              </Card>
              <Teams
                teams={this.props.teams}
                setCurrentTeam={this.props.setCurrentTeam}
              />
              <Card>
                <CardContent className={classes.card}>
                  <ListItem>
                    <Button
                      variant="contained"
                      fullWidth
                      className={classes.button}
                      onClick={this.props.handleOpenAddTeamModal}
                    >
                      Add Teams
                    </Button>
                  </ListItem>
                </CardContent>
              </Card>
            </List>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
