import type { NextPage } from "next";
import { FrappeGantt } from "frappe-gantt-react";
import { tasks } from "../repositories/testData";
import React, { useContext } from "react";
import { ScheduleDataContext } from "../components/scheduleDataProvider";

const Home: NextPage = () => {
  const ScheduleData = useContext(ScheduleDataContext);
  console.log(ScheduleData);
  return (
    <div>
      <FrappeGantt
        tasks={tasks}
        // viewMode={this.state.mode}
        onClick={(task) => console.log(task, "click")}
        onDateChange={(task, start, end) => console.log(task, start, end, "date")}
        onProgressChange={(task, progress) => console.log(task, progress, "progress")}
        onTasksChange={(tasks) => console.log(tasks, "tasks")}
      />
    </div>
  );
};

export default Home;
