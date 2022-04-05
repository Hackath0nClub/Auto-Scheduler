import type { NextPage } from "next";
import dynamic from "next/dynamic";

const GanttChart: NextPage = () => {
  const Gantt = dynamic(() => import("../components/gantt"));
  return <Gantt />;
};

export default GanttChart;