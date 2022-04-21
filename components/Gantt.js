import React, { Component, useContext } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";

class DhtmlxGantt extends Component {
  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  render() {
    return (
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    );
  }
}

const Gantt = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);

  return (
    <>
      <DhtmlxGantt tasks={scheduleData} />
    </>
  );
};

export default Gantt;
