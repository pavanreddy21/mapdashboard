import React from "react";
import Header from "../Header";
import Progress from "../Progress";
import { Divider, FormHelperText, Toolbar, AppBar } from "@material-ui/core";
import ObjectiveList from "../ObjectiveList.js";
import AddItem from "../AddItem";
import "./Dashboard.css"

const Dashboard = props => (
  <main className={props.classes.content}>
    <div className={props.classes.toolbar} />
    <Header
      user={props.user}
      year={props.year}
      quater={props.quater}
      changeTimePeriod={props.changeTimePeriod}
      handleAddObjectiveModalOpen={props.handleAddObjectiveModalOpen}
      team={props.team}
    />
    <Divider />
    <Progress
      completed={props.completedProgress}
      expected={props.expectedProgress}
    />
    <Divider />

    {props.objectivesPresent ? (
      <React.Fragment>
        <AppBar
          position="static"
          style={{backgroundColor:"white" }}
          className="appBar"
        >
          <Toolbar style={{ height: 20 }}>
            <FormHelperText
              style={{
                color: "#A9A9A9",
                display: "inline",
                width: 250,
                marginBottom: 35
              }}
            >
              OKR
            </FormHelperText>
            <FormHelperText
              style={{
                textAlign: "right",
                color: "#A9A9A9",
                paddingLeft: 40,
                marginBottom: 37
              }}
            >
              OWNER
            </FormHelperText>
            <FormHelperText
              style={{
                textAlign: "right",
                color: "#A9A9A9",
                width: 170,
                paddingLeft: 150,
                marginBottom: 37
              }}
            >
              WHEN
            </FormHelperText>

            <FormHelperText
              style={{
                textAlign: "right",
                color: "#A9A9A9",
                width: "35%",
                marginRight: 200,
                marginBottom: 37
              }}
            >
              STATUS
            </FormHelperText>
          </Toolbar>
        </AppBar>
        {props.orgObjectives !== undefined ? (
          <React.Fragment>
            <AppBar
              position="static"
              color="default"
              style={{ height: 30, marginBottom: 10 }}
            >
              <Toolbar style={{ height: 20 }}>
                <span
                  style={{
                    color: "#A9A9A9",
                    display: "inline",
                    width: 250,
                    marginBottom: 35
                  }}
                >
                  ZMS OKRs
                </span>
              </Toolbar>
            </AppBar>
            <ObjectiveList
              style={{ marginTop: 20, marginBottom: 20 }}
              objectives={props.orgObjectives}
              deleteObjective={props.deleteObjective}
              handleChangeObjectiveTitle={props.handleChangeObjectiveTitle}
              handleAddObjectiveModalOpen={props.handleAddObjectiveModalOpen}
              handleChangeObjectiveQuarter={props.handleChangeObjectiveQuarter}
            />
            <AppBar
              position="static"
              color="default"
              style={{ height: 30, marginBottom: 10, marginTop: 22 }}
            >
              <Toolbar style={{ height: 20 }}>
                <span
                  style={{ color: "#A9A9A9", width: 250, marginBottom: 35 }}
                >
                  Individual OKRs
                </span>
              </Toolbar>
            </AppBar>
          </React.Fragment>
        ) : null}

        <ObjectiveList
          objectives={props.objectives}
          deleteObjective={props.deleteObjective}
          handleChangeObjectiveTitle={props.handleChangeObjectiveTitle}
          handleAddObjectiveModalOpen={props.handleAddObjectiveModalOpen}
          handleChangeObjectiveQuarter={props.handleChangeObjectiveQuarter}
        />
      </React.Fragment>
    ) : (
      <AddItem
        user={props.user}
        year={props.year}
        quater={props.quater}
        changeTimePeriod={props.changeTimePeriod}
        handleAddObjectiveModalOpen={props.handleAddObjectiveModalOpen}
      />
    )}
  </main>
);

Dashboard.defaultProps = {
team:null
};

export default Dashboard;
