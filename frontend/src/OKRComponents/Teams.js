import React, { Component } from "react";
import {
  withStyles,
  Card,
  CardContent,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  cardText: {
    color: "white",
    fontWeight: "lighter",
    fontSize: "15px"
  },
  input: {
    backgroundColor: "white",
    height: "2rem",
    width: "100%"
  },
  card: {
    backgroundColor: "#41A4E5"
  }
});

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }
  componentDidMount = () => {
    this.setState({ teams: this.props.teams });
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ teams: nextProps.teams });
  };
  handleSearchTeams = event => {
    var updatedTeams = this.props.teams;
    updatedTeams = updatedTeams.filter(item => {
      return (
        item["name"].toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({
      teams: updatedTeams
    });
  };
  setCurrentTeam = team => {
    this.props.setCurrentTeam(team);
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Card>
          <CardContent className={classes.card}>
            <input
              type="text"
              className={classes.input}
              placeholder="Search for teams"
              onChange={this.handleSearchTeams}
            />
          </CardContent>
        </Card>
        {this.state.teams.map(team => (
          <Card key={team.id}>
            <Link style={{ textDecoration: "none" }} to={"/team/" + team.id}>
              <CardContent
                className={classes.card}
                onClick={() => this.setCurrentTeam(team)}
              >
                <ListItem>
                  <ListItemText
                    className={classes.cardText}
                    disableTypography
                    primary={team.name}
                  />
                </ListItem>
              </CardContent>
            </Link>
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Teams);
