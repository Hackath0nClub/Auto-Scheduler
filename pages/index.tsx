import type { NextPage } from 'next'
import * as React from "react";
import { render } from "react-dom";
import { FrappeGantt } from "frappe-gantt-react";

const Home: NextPage = () => {
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
      progress: 40,
      dependencies: "Task 3"
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
        tasks={tasks}
        // viewMode={this.state.mode}
        onClick={(task) => console.log(task, "click")}
        onDateChange={(task, start, end) =>
          console.log(task, start, end, "date")
        }
        onProgressChange={(task, progress) =>
          console.log(task, progress, "progress")
        }
        onTasksChange={(tasks) => console.log(tasks, "tasks")}
      />
    </div>
  );
}

export default Home
