import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgressbar from "react-circular-progressbar";
import { Line } from "rc-progress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  outerContainer: {
    marginTop: "25px",
    marginBottom: "25px"
  },
  progressText: {
    textAlign: "left",
    color: "#CBD0D6",
    marginBottom: "5px"
  },
  line: {
    width: "80%",
    height: "15px",
    position: "relative",
    zIndex: 1
  },
  actualProgress: {
    paddingRight: "5px",
    fontSize: "15px"
  },
  notStarted:{
    fontSize: "10px",
     color: "#CBD0D6" 
  },
  postponed:{
     fontSize: "10px",
      color: "#49B1F5" 
  },
  done:{
    fontSize: "10px", 
    color: "#83677E" 
  },
  atRisk:{
    fontSize: "10px",
     color: "#FF0000" 
  },
  behind:{
    fontSize: "10px", 
    color: "#FEAC41" 
  }
});

class Progress extends Component {
  constructor() {
    super();
    this.state = {
      current: "#5EBA08"
    };
  }
  render() {
    const { classes } = this.props;
    const completed = this.props.completed;
    const expected = this.props.expected;
    const current = this.state.current;
    let line = expected * 0.81 + "%";

    return (
      <React.Fragment>
        <Grid container className={classes.outerContainer}>
          <Grid item xs={3}>
            <FormHelperText className={classes.progressText}>
              P R O G R E S S
            </FormHelperText>
            <Line
              percent={completed}
              strokeWidth="4"
              strokeColor="#5EBA08"
              trailWidth="4"
              trailColor="#d6d6d6"
              className={classes.line}
            />
            <div
              style={{
                paddingLeft: line,
                width: "80%",
                marginTop: "-20px",
                fontSize: "15px",
                position: "relative",
                zIndex: 2
              }}
            >
              <span style={{ border: "2px solid black", height: "15px" }} />
            </div>
            <div style={{ marginTop: "5px" }}>
              <i className="fas fa-circle" style={{ color: current }}>
              </i>
              <span style={{ fontSize: "14px" }}>
                Actual Progress: {completed}%
              </span>
            </div>
            <div
              style={{ paddingLeft: "5px", marginTop: "5px", fontSize: "15px" }}
            >
              <span
                style={{
                  border: "2px solid black",
                  height: "15px",
                  marginRight: "10px",
                  fontSize: "15px"
                }}
              />
              <span style={{ fontSize: "14px" }}>
                Expected Progress: {expected}%
              </span>
            </div>
          </Grid>
          <Grid item xs={4} align="left" style={{ display: "block" }}>
            <FormHelperText style={{ color: "#CBD0D6", marginBottom: "5px" }}>
              O K R BY S T A T U S
            </FormHelperText>
            <Grid container>
              <Grid item>
                <div style={{ width: "65px", marginRight: "10px" }}>
                  <CircularProgressbar
                    percentage={1}
                    strokeWidth={10}
                    styles={{
                      root: {},
                      path: {
                        stroke: "#5EBA08",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      },
                      trail: {
                        stroke: "#d6d6d6"
                      }
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={1} style={{ marginTop: "5px" }}>
                <div style={{ width: "15px" }}>
                  <CircularProgressbar
                    percentage={100}
                    strokeWidth={50}
                    styles={{
                      root: {},
                      path: {
                        stroke: "#5EBA08",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      }
                    }}
                  />
                </div>
                <div style={{ width: "15px" }}>
                  <CircularProgressbar
                    percentage={100}
                    strokeWidth={50}
                    styles={{
                      root: { display: "inline" },
                      path: {
                        stroke: "#FEAC41",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      }
                    }}
                  />
                </div>
                <div style={{ width: "15px" }}>
                  <CircularProgressbar
                    percentage={100}
                    strokeWidth={50}
                    styles={{
                      root: {},
                      path: {
                        stroke: "#FF0000",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      }
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={3} style={{ marginTop: "0px" }}>
                <FormHelperText style={{ fontSize: "10px", color: "#5EBA08" }}>
                  ON TRACK
                </FormHelperText>
                <FormHelperText >
                  BEHIND
                </FormHelperText>
                <FormHelperText className={classes.atRisk}>
                  AT RISK
                </FormHelperText>
              </Grid>
              <Grid item xs={1} style={{ marginTop: "5px" }}>
                <div style={{ width: "15px" }}>
                  <CircularProgressbar
                    percentage={100}
                    strokeWidth={50}
                    styles={{
                      root: {},
                      path: {
                        stroke: "#83677E",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      }
                    }}
                  />
                </div>
                <div style={{ width: "15px" }}>
                  <CircularProgressbar
                    percentage={100}
                    strokeWidth={50}
                    styles={{
                      root: { display: "inline" },
                      path: {
                        stroke: "#49B1F5",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      }
                    }}
                  />
                </div>
                <div style={{ width: "15px" }}>
                  <CircularProgressbar
                    percentage={100}
                    strokeWidth={50}
                    styles={{
                      root: {},
                      path: {
                        stroke: "#CBD0D6",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                      }
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={3}>
                <FormHelperText className={classes.done}>
                  DONE
                </FormHelperText>
                <FormHelperText className={classes.postponed}>
                  POSTPONED
                </FormHelperText>
                <FormHelperText className={classes.notStarted}>
                  NOT STARTED
                </FormHelperText>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Progress);
