import React, { Component, useContext, useEffect } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";

const Gantt = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    gantt.parse(scheduleData);
    gantt.render();
  });

  let targetIds: number[] = [];
  let beforStartDate: Date;
  let afterStartDate: Date;

  const searchRecursiveDependLinks = (id: number) => {
    const links = gantt.getLinks();
    const dependLinks = links.filter((link) => link.source == id);
    if (dependLinks != []) {
      dependLinks.map((link) => searchRecursiveDependLinks(link.target));
    }
    dependLinks.map((dependLink) => targetIds.push(dependLink.target));
  };

  const addDate = (task: any, date: number) => {
    const formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(gantt.date.add(task.start_date, date / 60000, "minute"));
  };

  const createUpdateData = () => {
    const currentData = gantt.serialize();
    const dragDate = afterStartDate.getTime() - beforStartDate.getTime();
    const addDateData = currentData.data.map((task: any) => {
      if (targetIds.includes(task.id)) {
        task.start_date = addDate(task, dragDate);
        task.end_date = addDate(task, dragDate);
      }
      return task;
    });
    const updateData = {
      data: addDateData,
      links: currentData.links,
    };
    return updateData;
  };

  gantt.attachEvent(
    "onBeforeTaskDrag",
    function (id) {
      targetIds = [];
      beforStartDate = gantt.getTask(id).start_date;
      return true;
    },
    {}
  );

  gantt.attachEvent(
    "onAfterTaskDrag",
    function (id) {
      afterStartDate = gantt.getTask(id).start_date;
      searchRecursiveDependLinks(id);
      const updateData = createUpdateData();
      setScheduleData(updateData);
    },
    {}
  );

  return (
    <>
      <div id="gantt" style={{ width: "100%", height: "80vh" }}></div>
    </>
  );
};

export default Gantt;
