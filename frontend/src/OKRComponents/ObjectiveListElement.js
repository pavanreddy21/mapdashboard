import React, { Component } from "react";
import "./ObjectiveListElement.css";

import {  FormHelperText, Select, MenuItem } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Line } from "rc-progress";
import Input from "@material-ui/core/Input";
import classNames from "classnames";

export default class ObjectiveListElement extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  state = {
    showsubObjective: false,
    showTextField: false,
    showQuarterDropdown: "hidden",
    openQuarterDropdown: false
  };

  getsubObjective = subObjective => {
    return subObjective.map(eachsubObjective => {
      return (
        <ObjectiveListElement
          key={subObjective.id}
          padding={this.props.padding + 16}
          element={eachsubObjective}
          deleteObjective={this.props.deleteObjective}
          handleChangeObjectiveTitle={this.props.handleChangeObjectiveTitle}
          handleAddObjectiveModalOpen={this.props.handleAddObjectiveModalOpen}
          handleChangeObjectiveQuarter={this.props.handleChangeObjectiveQuarter}
        />
      );
    });
  };

  togglesubObjective = () => {
    this.setState({ showsubObjective: !this.state.showsubObjective });
  };

  handleDeleteObjective = e => {
    e.stopPropagation();
    this.props.deleteObjective(this.props.element.id);
  };
  handleAddKeyResults = (e, objective) => {
    e.stopPropagation();
    this.props.handleAddObjectiveModalOpen(objective);
  };
  handleInputChange = (e, objective) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      this.handlechangeObjectice(e, objective);
    }
  };
  handlechangeObjectice = (e, objective) => {
    e.stopPropagation();
    this.props.handleChangeObjectiveTitle(
      objective,
      this.textInput.current.value
    );
    this.setState({ showTextField: false });
  };
  focusTextInput = e => {
    e.stopPropagation();
    this.setState({ showTextField: true }, () => {
      this.textInput.current.focus();
    });
  };
  handleCloseQuarterDropDown = e => {
    e.stopPropagation();
    this.setState({ openQuarterDropdown: false });
    this.setState({ showQuarterDropdown: "hidden" });
  };

  handleOpenQuarterDropDown = e => {
    e.stopPropagation();
    this.setState({ openQuarterDropdown: true });
    this.setState({ showQuarterDropdown: "visible" });
  };

  handleChangeQuarterDropDown = (event, objective) => {
    let quarter = event.target.value;
    this.props.handleChangeObjectiveQuarter(objective, quarter);
  };

  render() {
    let subObjective = null;

    let arrowIcon = null;

    if (this.state.showsubObjective === false) {
      arrowIcon = (
        <i
          style={{ paddingTop: 17 }}
          className="fa fa-caret-right"
          aria-hidden="true"
        />
      );
    } else {
      arrowIcon = (
        <i
          style={{ paddingTop: 17 }}
          className="fa fa-caret-down"
          aria-hidden="true"
        />
      );
    }

    if (
      this.props.element.subObjective.length !== 0 &&
      this.state.showsubObjective
    ) {
      subObjective = this.getsubObjective(this.props.element.subObjective);
    }
    if (this.props.element["deleted"] === true) return null;

    let quarter = "";
    if (
      this.props.element.startDate === "2019-01-01" &&
      this.props.element.endDate === "2019-03-31"
    ) {
      quarter = "Q1";
    } else if (
      this.props.element.startDate === "2019-04-01" &&
      this.props.element.endDate === "2019-06-30"
    ) {
      quarter = "Q2";
    } else if (
      this.props.element.startDate === "2019-07-01" &&
      this.props.element.endDate === "2019-09-30"
    ) {
      quarter = "Q3";
    } else if (
      this.props.element.startDate === "2019-10-01" &&
      this.props.element.endDate === "2019-12-31"
    ) {
      quarter = "Q4";
    } else {
      quarter = "Annual";
    }

    quarter += " " + this.props.element.startDate.substring(0, 4);

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          className="objective"
          style={{
            paddingLeft: this.props.padding + "px",
            display: "inline-block"
          }}
          onClick={this.togglesubObjective}
        >
          {arrowIcon}
          {this.state.showTextField ? (
            <React.Fragment>
              <Input
                style={{
                  display: "block",
                  paddingLeft: "17px",
                  paddingTop: 5,
                  width: 200
                }}
                inputRef={this.textInput}
                defaultValue={this.props.element.title}
                onKeyDown={e => this.handleInputChange(e, this.props.element)}
                onClick={e => e.stopPropagation()}
              />
              <i
                className="fas fa-check fa-1x"
                style={{ marginTop: 15, align: "left", marginRight: 30 }}
                onClick={e => this.handlechangeObjectice(e, this.props.element)}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p
                style={{
                  display: "block",
                  paddingLeft: "17px",
                  width: 200
                }}
              >
                {this.props.element.title}
              </p>
              <i
                className={classNames("icons", "fas fa-pencil-alt fa-1x")}
                style={{ marginTop: 10, align: "left", marginRight: 30 }}
                onClick={this.focusTextInput}
              />
            </React.Fragment>
          )}

          <i
            className="far fa-user-circle fa-2x"
            style={{
              marginTop: 10,
              display: "inline-block",
              align: "left",
              PaddingLeft: "50"
            }}
          />
          <FormHelperText
            style={{
              textAlign: "left",
              color: "#A9A9A9",
              marginTop: "17px",
              marginLeft: 2
            }}
          >
            {this.props.element.ownerName}
          </FormHelperText>
          <FormHelperText
            style={{
              textAlign: "left",
              color: "#A9A9A9",
              marginTop: "17px",
              marginLeft: 100,
              width: 80
            }}
          >
            {quarter}
          </FormHelperText>
          <Select
            style={{ visibility: this.state.showQuarterDropdown }}
            onClose={this.handleCloseQuarterDropDown}
            onOpen={this.handleOpenQuarterDropDown}
            onChange={e =>
              this.handleChangeQuarterDropDown(e, this.props.element)
            }
            value={""}
            open={this.state.openQuarterDropdown}
            displayEmpty
          >
            <MenuItem value={"Annual"}>Annual 2019</MenuItem>
            <MenuItem value={"Q1"}>Q1 2019</MenuItem>
            <MenuItem value={"Q2"}>Q2 2019</MenuItem>
            <MenuItem value={"Q3"}>Q3 2019</MenuItem>
            <MenuItem value={"Q4"}>Q4 2019</MenuItem>
          </Select>
          <i
            className={classNames("icons", "fas fa-chevron-circle-down fa-1x")}
            style={{ marginTop: 12, paddingLeft: 5, paddingRight: 90 }}
            onClick={this.handleOpenQuarterDropDown}
          />
          <Line
            percent={this.props.element.percentageCompleted}
            strokeWidth="4"
            strokeColor="#5EBA08"
            trailWidth="4"
            trailColor="#d6d6d6"
            style={{ width: "25%", height: "10px", marginTop: 19 }}
          />
          <FormHelperText
            style={{ color: "#CBD0D6", marginTop: 19, PaddingLeft: 2 }}
          >
            {this.props.element.percentageCompleted + "%"}{" "}
          </FormHelperText>

          <i
            className={classNames("icons", "fa fa-plus-circle")}
            onClick={e => this.handleAddKeyResults(e, this.props.element)}
            style={{
              marginTop: 16,
              marginRight: 8,
              align: "left"
            }}
          />
          <i
            className={classNames("icons", "fa fa-trash")}
            onClick={this.handleDeleteObjective}
            style={{
              marginTop: 16,
              paddingLeft: 8,
              align: "left"
            }}
          />
        </ExpansionPanelSummary>

        {subObjective}
      </ExpansionPanel>
    );
  }
}
