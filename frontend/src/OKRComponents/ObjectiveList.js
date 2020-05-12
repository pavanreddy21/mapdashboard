import React, { Component } from "react";
import ObjectiveListElement from "./ObjectiveListElement.js";
import "./ObjectiveListElement.css";

export default class List extends Component {
  getList = listElement => {
    return listElement.map(eachListElement => {
      return (
        <ObjectiveListElement
          padding={16}
          key={eachListElement.id}
          element={eachListElement}
          deleteObjective={this.props.deleteObjective}
          handleChangeObjectiveTitle={this.props.handleChangeObjectiveTitle}
          handleAddObjectiveModalOpen={this.props.handleAddObjectiveModalOpen}
          handleChangeObjectiveQuarter={this.props.handleChangeObjectiveQuarter}
        />
      );
    });
  };

  render() {
    let list = this.getList(this.props.objectives);

    return <div>{list}</div>;
  }
}
