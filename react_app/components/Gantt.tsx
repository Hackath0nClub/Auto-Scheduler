import React, { useContext, useEffect } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";

const Gantt = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);

  const searchDependLinks = (id: number, targetIds: number[]) => {
    const dependLinks = gantt.getLinks().filter((link) => link.source == id);
    // 依存するIDを全て取得するまで(リンク先が得られなくなるまで)再帰呼び出しを行う
    if (dependLinks != []) {
      dependLinks.map((link) => searchDependLinks(link.target, targetIds));
    }
    dependLinks.map((dependLink) => targetIds.push(dependLink.target));
    return targetIds;
  };

  const addTaskDate = (task: any, date: number) => {
    const formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    const addDate = (tgt: any) => gantt.date.add(tgt, date / 60000, "minute");
    task.start_date = formatFunc(addDate(task.start_date));
    task.end_date = formatFunc(addDate(task.end_date));
    return task;
  };

  const createUpdateData = (linkIds: number[], dragDate: number) => {
    const ganttData = gantt.serialize();
    ganttData.data = ganttData.data.map((task: any) => {
      if (linkIds.includes(task.id)) {
        task = addTaskDate(task, dragDate);
      }
      return task;
    });
    return ganttData;
  };

  let beforStartDate: number = 0;

  const setBeforStartDate = (id: number) => {
    beforStartDate = gantt.getTask(id).start_date.getTime();
    return true;
  };

  const updateScheduleData = (id: number) => {
    const linkIds = searchDependLinks(id, []);
    const afterStartDate: number = gantt.getTask(id).start_date.getTime();
    const dragDate = afterStartDate - beforStartDate;
    const updateData = createUpdateData(linkIds, dragDate);
    setScheduleData(updateData);
  };

  const initializeGantt = () => {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.i18n.setLocale("jp");
    gantt.config.columns = [
      { name: "number", label: "", width: 20 },
      { name: "text", label: "件名", width: 200, tree: true, align: "center" },
      { name: "start_date", label: "開始", align: "center", width: 100 },
      { name: "end_date", label: "終了", align: "center", width: 100 },
      { name: "", label: "先行タスク", width: 200 },
      { name: "add", label: "", width: 30 },
    ];
    gantt.init("gantt");
    gantt.attachEvent("onBeforeTaskDrag", (id) => setBeforStartDate(id), {});
    gantt.attachEvent("onAfterTaskDrag", (id) => updateScheduleData(id), {});
  };

  const renderGantt = () => {
    gantt.parse(scheduleData);
    gantt.render();
  };

  useEffect(initializeGantt, []);
  useEffect(renderGantt, [scheduleData]);

  return (
    <>
      <div id="gantt" style={{ width: "100%", height: "80vh" }}></div>
    </>
  );
};

export default Gantt;
