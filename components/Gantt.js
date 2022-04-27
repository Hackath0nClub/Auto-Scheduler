import React, { Component, useContext } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";

// DHTMLXのブログに従って導入
// https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/?utm_source=trial_html&utm_medium=referral&utm_campaign=gantt
class DhtmlxGantt extends Component {
  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    gantt.i18n.setLocale("jp");
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
  return <DhtmlxGantt tasks={scheduleData} />;
};

export default Gantt;
