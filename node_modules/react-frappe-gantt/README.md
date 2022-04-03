# Frappé Gantt React Wrapper

It's a React Component, a Wrapper for the awesome
[Gantt chart library](https://github.com/frappe/gantt) from Frappé

This is a rework of the job made by **mohammed-io** in
[Original Repo](https://github.com/mohammed-io/frappe-gantt-react)

For the live demo, you can check their live demo
[here](https://frappe.github.io/gantt/)

## Install

> npm install react-frappe-gantt

or

> yarn add react-frappe-gantt

## Usage

Import it to your project

Using ES6 modules

`import { FrappeGantt } from 'react-frappe-gantt`

Or using CommonJS

`const { FrappeGantt } = require('react-frappe-gantt')`

Then you can use it in your react app:

```js
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
```

## The API

### The component `props`

|      Property      | Description                                                                                         |
| :----------------: | :-------------------------------------------------------------------------------------------------- |
|      `tasks`       | Accepts array of class `Task`                                                                       |
|     `viewMode`     | Accepts one of `Quarter Day`, `Half Day`, `Day`, `Week`, `Month`                                    |
|  `onTasksChange`   | Accepts a `(tasks: Task[]) => void`, where `tasks` is the new copy —manipulated— of array of tasks  |
|     `onClick`      | Accepts a `(task: Task) => void`, where `task` is the clicked task                                  |
|   `onDateChange`   | Accepts a `(task: Task, start: Moment, end: Moment) => void`, both start and end are Moment objects |
| `onProgressChange` | Accepts a `(task: Task, progress: number) => void`                                                  |
|   `onViewChange`   | Accepts a `(mode: ViewMode) => void`                                                                |
