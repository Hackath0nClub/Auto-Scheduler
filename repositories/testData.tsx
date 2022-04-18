let d1 = new Date();
let d2 = new Date();
d2.setDate(d2.getDate() + 5);
let d3 = new Date();
d3.setDate(d3.getDate() + 8);
let d4 = new Date();
d4.setDate(d4.getDate() + 20);

export let tasks: any = [
  {
    id: "Task 1",
    name: "Task 1",
    start: d1,
    end: d2,
    progress: 40,
    dependencies: "Task 3",
  },
  {
    id: "Task 2",
    name: "Task 2",
    start: d3,
    end: d4,
    progress: null,
    // dependencies: "Task 1"
  },
  {
    id: "Task 3",
    name: "Redesign website",
    start: new Date(),
    end: d4,
    progress: 0,
    // dependencies: "Task 2, Task 1"
  },
];

export let tasks2: any = [
  {
    id: "Task 1",
    name: "Task 100",
    start: d1,
    end: d2,
    progress: 100,
    dependencies: "Task 300",
  },
  {
    id: "Task 2",
    name: "Task 200",
    start: d3,
    end: d4,
    progress: 100,
    // dependencies: "Task 1"
  },
  {
    id: "Task 3",
    name: "Redesign website dane!!!!!!!!!",
    start: new Date(),
    end: d4,
    progress: 100,
    // dependencies: "Task 2, Task 1"
  },
];
