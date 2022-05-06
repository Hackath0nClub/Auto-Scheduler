import React, { Component, useContext } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";
import { Logger } from "sass";

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
    gantt.i18n.setLocale("jp");
    gantt.config.columns = [
      { name: "number", label: "", width: 20 },
      { name: "text", label: "件名", width: 200, tree: true, align: "center" },
      { name: "start_date", label: "開始", align: "center", width: 100 },
      { name: "end_date", label: "終了", align: "center", width: 100 },
      { name: "", label: "先行タスク", width: 200 },
      { name: "add", label: "", width: 30 },
    ];
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
        style={{ width: "100%", height: "80vh" }}
      ></div>
    );
  }
}

const Gantt = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);

  const logDataUpdate = () => {
    // const updateData = gantt.serialize();
    // setScheduleData(updateData);
  };

  // console.log(scheduleData);

  const searchRecursiveToTarget = (id) => {
    // const links = gantt.getLinks();
    // const dependLinks = links.filter((link) => link.source == id);
    // // if (dependLinks == {}) return [];
    // // else {
    // //   dependLinks.forEach((element) => {
    // //     console.log(element);
    // //     // searchRecursiveToTarget(element.id);
    // //   });
    // // }
    // const targetIds = dependLinks.map((dependLink) => dependLink.target);
    // return targetIds;
  };

  const searchDependLinks = (id) => {
    const targetIds = searchRecursiveToTarget(id);
    console.log(targetIds);
  };

  let beforStartDate;
  let AfterStartDate;

  gantt.attachEvent("onBeforeTaskDrag", function (id) {
    beforStartDate = gantt.getTask(id).start_date;
    return true;
  });

  gantt.attachEvent("onAfterTaskDrag", function (id) {
    AfterStartDate = gantt.getTask(id).start_date;
    console.log(beforStartDate - AfterStartDate);
    searchDependLinks(id);
  });

  return (
    <>
      {/* <DhtmlxGantt tasks={scheduleData} onDataUpdated={logDataUpdate} /> */}
      <DhtmlxGantt tasks={scheduleData} />
      <p>{JSON.stringify(scheduleData)}</p>
    </>
  );
};

export default Gantt;
