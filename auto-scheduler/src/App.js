import React, { Component } from "react";

import { FrappeGantt, Task, ViewMode } from "../index.js";

const tasks = [
  {
    id: "Task 1",
    name: "Redesign website",
    start: "2016-12-28",
    end: "2016-12-31",
    progress: 10,
    dependencies: "",
  },
  {
    id: "Task 2",
    name: "Redesign website",
    start: "2016-12-28",
    end: "2016-12-31",
    progress: 20,
    dependencies: "Task 1",
  },
  {
    id: "Task 3",
    name: "Redesign website",
    start: "2016-12-28",
    end: "2016-12-31",
    progress: 0,
    dependencies: "Task 2, Task 1",
  },
].map((x) => new Task(x));
{
  // Using class based component
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mode: ViewMode.Month,
      };
    }

    render() {
      return (
        <div>
          <FrappeGantt
            tasks={tasks}
            viewMode={this.state.mode}
            onClick={(task) => console.log(task)}
            onDateChange={(task, start, end) => console.log(task, start, end)}
            onProgressChange={(task, progress) => console.log(task, progress)}
            onTasksChange={(tasks) => console.log(tasks)}
          />
        </div>
      );
    }
  }
}

{
  // Using function based component
  const App = () => {
    return (
      <FrappeGantt
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
        tasks={tasks}
        viewMode={ViewMode.Month}
      />
    );
  };
}
