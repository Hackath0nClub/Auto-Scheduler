import React, { Component, useContext } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";

// DHTMLXのブログに従って導入
// https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/?utm_source=trial_html&utm_medium=referral&utm_campaign=gantt
class DhtmlxGantt extends Component {
  // instance of gantt.dataProcessor
  dataProcessor = null;

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor(() => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated();
        }
        return resolve();
      });
    });
  }

  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    gantt.parse(tasks);
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
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

  const dataUpdate = () => {
    let updateData = gantt.serialize();
    setScheduleData(updateData);
    console.log(scheduleData);
  };

  return <DhtmlxGantt tasks={scheduleData} onDataUpdated={dataUpdate} />;
};

export default Gantt;
