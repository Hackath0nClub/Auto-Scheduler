import * as React from "react";
import { render } from "react-dom";
// 怪しい
import { FrappeGantt, ViewMode ,Task} from "frappe-gantt-react";
import type { NextPage } from 'next';


var Gantt = () => {
  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);
  const tasks: any = [
    {
      id: "Task 1",
      name: "Task 1",
      start: d1,
      end: d2,
      progress: 10,
      dependencies: ""
    },
    {
      id: "Task 2",
      name: "Task 2",
      start: d3,
      end: d4,
      progress: null
      // dependencies: "Task 1"
    },
    {
      id: "Task 3",
      name: "Redesign website",
      start: new Date(),
      end: d4,
      progress: 0
      // dependencies: "Task 2, Task 1"
    }
  ];

  return (
    <div>
      <FrappeGantt
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
        tasks={tasks}
        viewMode={ViewMode.Month}
      />
    </div>
  );
};

export default Gantt;
