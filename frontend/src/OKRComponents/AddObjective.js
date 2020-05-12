import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import ObjectiveAlignerDropdown from "./ObjectiveAlignerDropdown";

import SubTask from "./SubTask.js";
import { FormControl, InputLabel } from "@material-ui/core";

const orangeAvatar = {
  margin: 10,
  color: "#fff",
  backgroundColor: deepOrange[500]
};

class AddObjective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objName: "",
      tag: "",
      description: "",
      alignTo: "",
      timePeriod: "",
      successMeasure: "",
      align: "No",
      duration: "",
      type: "individual",
      objectiveAlignTo: this.props.objectiveAlignTo,
      ownerId: this.props.user.id,

      subOpen: false,
      open: false,
      tagDisplay: "none",
      descriptionDisplay: "none",
      tagButtonDisplay: "block",
      descriptionButtonDisplay: "block",
      kpiDisplay: "none",
      alignDisplay: "none",
      disabled: true,
      currentObjective: "",
      newObj: []
    };
    this.alignObjective = this.alignObjective.bind(this);
  }
  handleOpenSub = () => {
    this.setState({ subOpen: true });
  };

  handleCloseSub = () => {
    this.setState({ subOpen: false }, () => this.props.handleClose());
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };

  handleObjectiveName(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ objName: value });
    if (value !== "") this.setState({ disabled: false });
    else this.setState({ disabled: true });
  }

  handleOpenTag() {
    this.setState({
      tagDisplay: "block",
      tagButtonDisplay: "none"
    });
  }

  handleOpenDesc() {
    this.setState({
      descriptionDisplay: "block",
      descriptionButtonDisplay: "none"
    });
  }

  handleSuccess(event) {
    let val = event.target.value;
    this.setState({
      successMeasure: event.target.value
    });
    if (val === "KPI") {
      this.setState({ kpiDisplay: "flex" });
    }
    if (val === "%") {
      this.setState({ kpiDisplay: "none" });
    }
  }

  handleAlign(event) {
    let val = event.target.value;
    this.setState({
      align: event.target.value
    });
    if (val === "Yes") {
      this.setState({ alignDisplay: "flex" });
    }
    if (val === "No") {
      this.setState({ alignDisplay: "none" });
    }
  }

  handleTimePeriod(event) {
    this.setState({
      timePeriod: event.target.value
    });
  }

  handleDuration(event) {
    this.setState({
      duration: event.target.value
    });
  }

  cancel(event) {
    this.props.handleClose();
  }

  alignObjective(val) {
    this.setState({ objectiveAlignTo: val });
  }

  saveAndClose(event) {
    let d = this.state.duration;
    let startDate, endDate;
    let year = "2019";
    if (d === "Q1") {
      startDate = year + "-01-01";
      endDate = year + "-03-31";
    } else if (d === "Q2") {
      startDate = year + "-04-01";
      endDate = year + "-06-30";
    } else if (d === "Q3") {
      startDate = year + "-07-01";
      endDate = year + "-09-30";
    } else if (d === "Q4") {
      startDate = year + "-10-01";
      endDate = year + "-12-31";
    } else {
      startDate = year + "-01-01";
      endDate = year + "-12-31";
    }

    let body = {
      title: this.state.objName,
      description: this.state.description,
      startDate: startDate,
      endDate: endDate,
      objectiveParentId: this.state.objectiveAlignTo.id,
      type: this.state.type,
      ownerId: this.props.user.id,
      createdBy: this.props.user.id
    };
    this.props.handleAddObjective(body);
    this.props.handleClose();
  }

  saveAndAddKeyResults() {
    let d = this.state.duration;
    let startDate, endDate;
    let year = "2019";
    if (d === "Q1") {
      startDate = year + "-01-01";
      endDate = year + "-03-31";
    } else if (d === "Q2") {
      startDate = year + "-04-01";
      endDate = year + "-06-30";
    } else if (d === "Q3") {
      startDate = year + "-07-01";
      endDate = year + "-09-30";
    } else if (d === "Q4") {
      startDate = year + "-10-01";
      endDate = year + "-12-31";
    } else {
      startDate = year + "-01-01";
      endDate = year + "-12-31";
    }

    let body = {
      title: this.state.objName,
      description: this.state.description,
      startDate: startDate,
      endDate: endDate,
      objectiveParentId: this.state.objectiveAlignTo.id,
      type: this.state.type,
      ownerId: this.props.user.id,
      createdBy: this.props.user.id
    };

    let currentObjective;
    this.props.handleAddObjective(body).then(data => {
      currentObjective = data;
      this.setState({ currentObjective: currentObjective }, () =>
        this.handleOpenSub()
      );
    });
  }

  render() {
    const { user } = this.props;
    const tag = this.state.tagDisplay;
    const desc = this.state.descriptionDisplay;
    const tagBtn = this.state.tagButtonDisplay;
    const descBtn = this.state.descriptionButtonDisplay;
    const kpiDisplay = this.state.kpiDisplay;
    const alignDisplay = this.state.alignDisplay;
    const firstName = user.firstName;
    const isOrganization = user.isOrganization;
    const userIcon = this.props.userIcon;
    const disabled = this.state.disabled;

    return (
      <React.Fragment>
        <Paper
          elevation={1}
          style={{
            marginLeft: "25px",
            marginRight: "25px",
            height: "100%",
            overflow: "auto"
          }}
        >
          <form id="addForm">
            <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
              <Typography
                variant="h3"
                style={{
                  textAlign: "center",
                  color: "#3F333F",
                  paddingTop: "25px",
                  paddingBottom: "25px"
                }}
              >
                Add Objective{" "}
              </Typography>
            </div>
            <Divider />
            <div>
              <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                <FormHelperText style={{ paddingTop: "25px" }}>
                  What is the objective?
                </FormHelperText>
                <TextField
                  id="objName"
                  value={this.state.objName}
                  onChange={this.handleObjectiveName.bind(this)}
                  fullWidth
                  variant="outlined"
                  placeholder="e.g. Double Sales ,new Shipping"
                  style={{ marginTop: "10px" }}
                />
                {this.state.objName === "" ? (
                  <FormHelperText>Objective Name is Required</FormHelperText>
                ) : (
                  <p />
                )}
                <FormHelperText style={{ float: "right", color: "#12C08B" }}>
                  See Sample Okrs
                </FormHelperText>
              </div>
              <div
                style={{
                  marginTop: "15px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingBottom: "25px",
                  display: "flex"
                }}
              >
                <Button
                  style={{
                    marginRight: "25px",
                    display: tagBtn,
                    textTransform: "none"
                  }}
                  onClick={this.handleOpenTag.bind(this)}
                >
                  <Typography variant="h6" style={{ color: "#12C08B" }}>
                    Add Tags
                  </Typography>
                </Button>
                <Button
                  style={{
                    marginRight: "25px",
                    display: descBtn,
                    textTransform: "none"
                  }}
                  onClick={this.handleOpenDesc.bind(this)}
                >
                  <Typography variant="h6" style={{ color: "#12C08B" }}>
                    Add Description
                  </Typography>
                </Button>
              </div>
              <div
                name="tag"
                style={{
                  paddingTop: "25px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  display: tag
                }}
              >
                <FormHelperText style={{ paddingTop: "25px" }}>
                  Tags
                </FormHelperText>
                <TextField
                  id="tag"
                  value={this.state.tag}
                  onChange={this.handleChange("tag")}
                  fullWidth
                  variant="outlined"
                  placeholder="Type a Tag"
                  style={{ marginTop: "10px" }}
                />
              </div>
              <div
                name="description"
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingBottom: "25px",
                  display: desc
                }}
              >
                <FormHelperText style={{ paddingTop: "25px" }}>
                  Additional Details
                </FormHelperText>
                <TextField
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange("description")}
                  fullWidth
                  placeholder="Details"
                  variant="outlined"
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
            <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
              {this.props.objectiveAlignTo === undefined ||
              this.props.objectiveAlignTo === "" ? (
                <Grid container>
                  <Grid item>
                    <FormHelperText
                      style={{ paddingTop: "10px", marginRight: "25px" }}
                    >
                      Do you want to align this objective?
                    </FormHelperText>
                  </Grid>
                  <Grid item>
                    <RadioGroup
                      row
                      aria-label="align"
                      name="align"
                      value={this.state.align}
                      onChange={this.handleAlign.bind(this)}
                    >
                      <FormControlLabel
                        style={{ display: "flex" }}
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  <Grid item>
                    <FormHelperText
                      style={{ paddingTop: "10px", marginRight: "25px" }}
                    >
                      objective Aligned to {this.props.objectiveAlignTo.title}
                    </FormHelperText>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                style={{ paddingBottom: "25px", display: alignDisplay }}
              >
                <Grid item xs={9} style={{ paddingRight: "25px" }}>
                  <ObjectiveAlignerDropdown
                    alignObjective={this.alignObjective}
                    ownerId={this.state.ownerId}
                  />
                </Grid>
                <Grid item xs={3} style={{ paddingRight: "25px" }} />
              </Grid>
              <Divider />
              <Grid
                container
                style={{ marginTop: "15px", marginBottom: "15px" }}
              >
                <Grid item xs={1}>
                  {this.state.type === "individual" ? (
                    <i
                      className="far fa-user-circle fa-3x"
                      style={{ display: "inline", align: "right" }}
                    />
                  ) : this.state.type === "organization" ? (
                    <i
                      className="fa fa-globe fa-3x"
                      style={{ display: "inline", align: "right" }}
                    />
                  ) : (
                    <i
                      className="fa fa-users fa-3x"
                      style={{ display: "inline", align: "right" }}
                    />
                  )}
                </Grid>
                <Grid
                  container
                  item
                  xs={2}
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <FormControl style={{ marginRight: 10 }}>
                    <InputLabel htmlFor="type-simple">Type</InputLabel>
                    <Select
                      value={this.state.type}
                      onChange={this.handleTypeChange}
                      inputProps={{
                        name: "type",
                        id: "type-simple"
                      }}
                    >
                      <MenuItem value={"individual"}>Individual</MenuItem>
                      {isOrganization ? (
                        <MenuItem value={"organization"}>Organization</MenuItem>
                      ) : (
                        ""
                      )}
                      {this.props.team !== "" ? (
                        <MenuItem value={"team" + this.props.team.id}>
                          {this.props.team.name}
                        </MenuItem>
                      ) : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <Avatar style={orangeAvatar}>{userIcon}</Avatar>
                </Grid>
                <Grid item xs={1}>
                  <FormHelperText
                    style={{ paddingBottom: "5px", align: "left" }}
                  >
                    Owner
                  </FormHelperText>
                  {firstName}
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2}>
                  <FormHelperText
                    style={{ paddingBottom: "5px", align: "left" }}
                  >
                    When
                  </FormHelperText>
                  <Select
                    value={this.state.duration}
                    onChange={this.handleDuration.bind(this)}
                    name="duration"
                    id="duration"
                    displayEmpty
                  >
                    <MenuItem value="">Annual 2019</MenuItem>
                    <MenuItem value="Q1">Q1 2019</MenuItem>
                    <MenuItem value="Q2">Q2 2019</MenuItem>
                    <MenuItem value="Q3">Q3 2019</MenuItem>
                    <MenuItem value="Q4">Q4 2019</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Divider />
              <div
                style={{
                  backgroundColor: "12C08B",
                  float: "right",
                  marginTop: "25px",
                  marginBottom: "25px",
                  display: "block"
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    textTransform: "none",
                    marginRight: "10px",
                    color: "#12C08B"
                  }}
                  onClick={this.cancel.bind(this)}
                >
                  <Typography style={{ textAlign: "center", color: "#12C08B" }}>
                    Cancel
                  </Typography>
                </Button>
                <Button
                  disabled={disabled}
                  variant="outlined"
                  style={{
                    textTransform: "none",
                    marginRight: "10px",
                    color: "#ffffff",
                    backgroundColor: "#12C08B"
                  }}
                  onClick={this.saveAndClose.bind(this)}
                >
                  <Typography style={{ textAlign: "center", color: "white" }}>
                    Save and Close
                  </Typography>
                </Button>
                <Button
                  disabled={disabled}
                  variant="outlined"
                  style={{
                    textTransform: "none",
                    marginRight: "10px",
                    color: "#ffffff",
                    backgroundColor: "#12C08B"
                  }}
                  onClick={this.saveAndAddKeyResults.bind(this)}
                >
                  <Typography style={{ textAlign: "center", color: "white" }}>
                    Save and Add Key Results
                  </Typography>
                </Button>
              </div>
              <Divider />
            </div>
          </form>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.subOpen}
          onClose={this.handleCloseSub}
          style={{
            marginLeft: "25px",
            marginRight: "25px",
            marginTop: "25px",
            marginBottom: "25px"
          }}
          disableBackdropClick
        >
          <SubTask
            userIcon={this.props.userIcon}
            user={this.props.user}
            handleClose={this.handleCloseSub}
            handleAddObjective={this.props.handleAddObjective}
            addSubObjective={this.props.addSubObjective}
            objectiveAlignTo={this.state.currentObjective}
            team={this.props.team}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddObjective;
