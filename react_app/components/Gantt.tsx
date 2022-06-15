import React, { useContext, useEffect } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ScheduleDataContext } from "./ScheduleDataProvider";

const Gantt = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);

  // ガント初期設定
  const initializeGantt = () => {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.drag_project = true;
    gantt.i18n.setLocale("jp");
    gantt.config.start_date = new Date("2000, 01, 01");
    gantt.config.end_date = new Date("2100, 12, 31");
    gantt.config.scales = [
      {unit: "month", step: 1, format: "%Y年%F"},
      {unit: "day", step:1, format: "%j日(%D)" }
  ];
    gantt.config.columns = [
      { name: "number", label: "", width: 20 },
      { name: "text", label: "件名", width: 200, tree: true, align: "center" },
      { name: "start_date", label: "開始", align: "center", width: 100 },
      { name: "end_date", label: "終了", align: "center", width: 100 },
      { name: "", label: "先行タスク", width: 200 },
      { name: "add", label: "", width: 30 },
    ];
    gantt.init("gantt");
    // タスクドラック操作に処理アタッチ
    gantt.attachEvent("onBeforeTaskDrag", (id) => setBeforeStartDate(id), {});
    gantt.attachEvent("onAfterTaskDrag", (id) => updateScheduleData(id), {});
    // タスク選択フォームからの変更に処理をアタッチ
    gantt.attachEvent("onLightbox", (id) => setBeforeStartDate(id), {});
    gantt.attachEvent("onLightboxSave", (id) => updateScheduleDataOnTable(id), {});
    // リンク操作に処理アタッチ
    gantt.attachEvent("onAfterLinkAdd", () => updateScheduleLinks(), {});
    gantt.attachEvent("onAfterLinkDelete", () => updateScheduleLinks(), {});
  };

  const renderGantt = () => {
    gantt.parse(scheduleData);
    gantt.render();
  };

  useEffect(initializeGantt, []);
  useEffect(renderGantt, [scheduleData]);


  const searchDependLinks = (id: number, targetIds: number[]) => {
    // getLinks()で取得するsource, targetがString型なので、numberに変換
    const dependLinks = gantt.getLinks().map((dependLink) => {
      dependLink.source = Number(dependLink.source);
      dependLink.target = Number(dependLink.target);
      return dependLink;
    });
    const matchDependLinks = dependLinks.filter((link) => link.source == id);
    // 依存するIDとその子タスクのIDをtargetIds[]に追加する
    matchDependLinks.map((link) => {
      targetIds.push(link.target);
      gantt.eachTask((child) => targetIds.push(child.id), link.target);
    });
    // 依存するIDを全て取得するまで(リンク先が得られなくなるまで)再帰呼び出しを行う
    if (matchDependLinks != []) {
      matchDependLinks.map((link) => searchDependLinks(link.target, targetIds));
    }
    return targetIds;
  };

  const addDate = (targetDate: any, dragDate: number) => {
    const formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(gantt.date.add(targetDate, dragDate / 60000, "minute"));
  };

  const createUpdateData = (ganttData: any, linkIds: number[], dragDate: number) => {
    // let ganttData = gantt.serialize();
    console.log(ganttData);
    ganttData.data = ganttData.data.map((task: any) => {
      if (linkIds.includes(task.id)) {
        task.start_date = addDate(task.start_date, dragDate);
        task.end_date = addDate(task.end_date, dragDate);
      }
      // 親タスクのdate情報をnullにすることで暗黙的に type: project となり、子タスクdateに依存する
      if (gantt.hasChild(task.id)) {
        task.start_date = null;
        task.end_date = null;
        task.duration = null;
      }
      return task;
    });
    return ganttData;
  };

  let beforeStartDate: number = 0;

  const setBeforeStartDate = (id: number) => {
    beforeStartDate = gantt.getTask(id).start_date.getTime();
    return true;
  };

  const updateScheduleData = (id: number) => {
    const linkIds = searchDependLinks(id, []);
    const afterStartDate: number = gantt.getTask(id).start_date.getTime();
    const dragDate = afterStartDate - beforeStartDate;
    let ganttData = gantt.serialize();
    let updateData = createUpdateData(ganttData, linkIds, dragDate);
    setScheduleData(updateData);
    return true;
  };

  const updateScheduleDataOnTable = (id: number) => {
    const linkIds = searchDependLinks(id, [id]);
    const lightboxTimeValue = gantt.getLightboxSection("time").getValue();
    var descr = gantt.getLightboxSection("description");
    // console.log(descr.getValue());
    const afterStartDate: number = lightboxTimeValue.start_date.getTime();
    const dragDate = afterStartDate - beforeStartDate;
    let ganttData = gantt.serialize();
    console.log(ganttData);
    ganttData.data = ganttData.data.map((data: any) => {
      if (data.id == id) {
        data.text = descr.getValue();
      }
      return data;
    });
    console.log(ganttData);
    let updateData = createUpdateData(ganttData, linkIds, dragDate);
    setScheduleData(updateData);
    return true;
  };

  const updateScheduleLinks = () => {
    let updateData = gantt.serialize();
    setScheduleData(updateData);
    return true;
  };

  return (
    <>
      <div id="gantt" style={{ width: "100%", height: "80vh" }}></div>
    </>
  );
};

export default Gantt;
