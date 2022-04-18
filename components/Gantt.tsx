import type { NextPage } from "next";
import { FrappeGantt } from "frappe-gantt-react";
import { projects } from "../repositories/testData";
import React, { useContext } from "react";
import { ScheduleDataContext } from "./scheduleDataProvider";

const Home: NextPage = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);
  console.log(scheduleData);

  return (
    <div>
      {scheduleData.map((project: any) => (
        <FrappeGantt
          key={project.id}
          // tasks={tasks}
          tasks={project.tasks}
          // viewMode={this.state.mode}
          onClick={(task) => console.log(task, "click")}
          // onClick={() => setScheduleData(tasks2)}
          onDateChange={(task, start, end) =>
            console.log(task, start, end, "date")
          }
          onProgressChange={(task, progress) =>
            console.log(task, progress, "progress")
          }
          onTasksChange={(tasks) => console.log(tasks, "tasks")}
        />
      ))}
    </div>
  );
};

export default Home;
